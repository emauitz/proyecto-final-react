import { useState, useEffect } from 'react';
import { DateTime } from 'luxon';
import { db } from '../config/firebase';
import { doc, getDoc } from 'firebase/firestore';
import  useAuthContext  from '../context/UseAuthContext';

function obtenerSaludo(hora) {
    if (hora >= 6 && hora < 12) {
        return 'buenos días';
    } else if (hora >= 12 && hora < 18) {
        return 'buenas tardes';
    } else {
        return 'buenas noches';
    }
}

function PerfilTodo() {
    const [fecha, setFecha] = useState('');
    const [saludo, setSaludo] = useState('');
    const { usuario } = useAuthContext();

    useEffect(() => {
        const ahora = DateTime.now();
        setFecha(ahora.toLocaleString(DateTime.DATE_SHORT));

        const cargarUsuario = async () => {
            if (usuario) {
                console.log("Usuario autenticado:", usuario)
                const docRef = doc(db, 'usuarios', usuario.uid);
                const docSnap = await getDoc(docRef);

                if (docSnap.exists()) {
                    const userData = docSnap.data();
                    console.log("Datos del usuario:", userData);
                    const saludo = obtenerSaludo(ahora.hour);
                    setSaludo(`Hola ${userData.username}, ${saludo}`);
                }  else {
                    console.log("El documento del usuario no existe");
                }
            } else {
                console.log("Usuario no autenticado");
            }
        };

        cargarUsuario();
    }, [usuario]);

    return (
        <div className="perfil">
            <div id="fecha">{fecha}</div>
            <h2 id="saludo">{saludo}</h2>
            <span>vamos a ordenar tus tareas</span>
        </div>
    );
}

export default PerfilTodo;
