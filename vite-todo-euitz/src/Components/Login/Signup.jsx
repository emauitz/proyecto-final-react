import { useState } from 'react';
import CustomButton from '../Button';
import CustomInput from '../Input';
import Swal from 'sweetalert2';
import { auth, db } from '../../config/firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { setDoc, doc } from 'firebase/firestore';

function SignupForm() {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [repPassword, setRepPassword] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
        await crearUsuario(username, email, password, repPassword);
    };

    const crearUsuario = async (username, email, password, repPassword) => {
        if (!username || !email || !password || !repPassword) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'No se completaron todos los campos!',
            });
            return;
        }
        if (password !== repPassword || password.length < 6) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Las contraseñas deben coincidir y tener al menos 6 caracteres!',
            });
            return;
        }

        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            // Guardar el nombre de usuario en Firestore
            await setDoc(doc(db, 'usuarios', user.uid), {
                username: username,
                email: email,
                createdAt: new Date()
            });

            Swal.fire({
                icon: 'success',
                title: 'Éxito!',
                text: 'Tu usuario fue creado correctamente!',
            }).then(() => {
                setUsername('');
                setEmail('');
                setPassword('');
                setRepPassword('');
            });
        } catch (error) {
            console.error('Error al crear usuario:', error);
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: error.message,
            });
        }
    };

    return (
        <form className="FormField" onSubmit={handleSubmit}>
            <h2>Sign-Up</h2>
            <span>Crea un nuevo usuario</span>
            <CustomInput
                placeholder="Nombre"
                type="text"
                value={username}
                name="username"
                onChange={(e) => setUsername(e.target.value)}
            />
            <CustomInput
                placeholder="Email"
                type="text"
                value={email}
                name="email"
                onChange={(e) => setEmail(e.target.value)}
            />
            <CustomInput
                placeholder="Password"
                type="password"
                value={password}
                name="password"
                onChange={(e) => setPassword(e.target.value)}
            />
            <CustomInput
                placeholder="Confirma Password"
                type="password"
                value={repPassword}
                name="repPassword"
                onChange={(e) => setRepPassword(e.target.value)}
            />
            <CustomButton funcion={handleSubmit} clase="formButton" label="Registrarse" />
        </form>
    );
}

export default SignupForm;
