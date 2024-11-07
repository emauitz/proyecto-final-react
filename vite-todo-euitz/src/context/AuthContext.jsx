import { createContext, useState, useEffect } from 'react';
import { auth, db } from '../config/firebase';
import { onAuthStateChanged, signInWithEmailAndPassword, signOut, createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
// Crear el contexto
const AuthContext = createContext();

// Crear un proveedor que maneje el estado y la autenticación
const AuthProvider = ({ children }) => {
    const [usuario, setUsuario] = useState(null);

    // Cargar el estado de autenticación
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async(currentUser) => {
            if (currentUser) {
                const docRef = doc(db, 'usuarios', currentUser.uid);
                const docSnap = await getDoc(docRef);

                if (docSnap.exists()) {
                    setUsuario({ ...currentUser, ...docSnap.data() });
                } else {
                    setUsuario(currentUser);
                }
            } else {
                setUsuario(null);
            }
        });
        return () => unsubscribe();
    }, []);

    // Función para iniciar sesión
    const login = async (email, password) => {
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;
            const docRef = doc(db, 'usuarios', user.uid);
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                setUsuario({ ...user, ...docSnap.data() });
            } else {
                setUsuario(user);
            }
        } catch (error) {
            console.error('Error al iniciar sesión:', error.message);
            throw error;
        }
    };

    // Función para cerrar sesión
    const logout = async () => {
        try {
            await signOut(auth);
            setUsuario(null);
        } catch (error) {
            console.error('Error al cerrar sesión:', error.message);
        }
    };

    // Función para registrarse
    const signup = async (username, email, password) => {
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            setUsuario(userCredential.user);
        } catch (error) {
            console.error('Error al registrarse:', error.message);
            throw error;
        }
    };

    return (
        <AuthContext.Provider value={{ usuario, login, logout, signup }}>
            {children}
        </AuthContext.Provider>
    );
};

export { AuthContext, AuthProvider };
