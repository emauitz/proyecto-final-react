import { useState, useContext } from 'react';
import Swal from 'sweetalert2';
import CustomInput from '../Input.jsx';
import CustomButton from '../Button.jsx';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext.jsx';

function LoginForm() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const { login } = useContext(AuthContext);

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            await login(email, password);
            navigate('/'); 
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Credenciales incorrectas. Por favor, intenta de nuevo.',
            });
        }
    };

    return (
        <form className="FormField" onSubmit={handleSubmit}>
            <h2>Login</h2>
            <span>Carga tus datos para comenzar</span>
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
            <CustomButton
                label="Iniciar Sesión"
                clase="formButton"
                funcion={handleSubmit}
            />
        </form>
    );
}

export default LoginForm;
