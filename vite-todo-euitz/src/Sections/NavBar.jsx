import { useState } from 'react';
import CustomButton from '../Components/Button';
import SettingsModal from '../ModalSettings/SettingsModal';

function TodoNavBar() {
    const [isSettingsOpen, setIsSettingsOpen] = useState(false);

    const handleLogout = () => {
        localStorage.removeItem('login_success');
        window.location.href = '/login';
    };

    const handleSettings = () => {
        setIsSettingsOpen(true); // Abre el modal
    };

    return (
        <header className='header'>
            <div className="nombre-app">
                <h1>TODO-APP</h1>
            </div>
            <nav className="nav-bar">
                <ul>
                    <li>
                        <CustomButton label="Log-out" funcion={handleLogout} clase="NavbarButton" />
                    </li>
                    <li>
                        <CustomButton label="Settings" funcion={handleSettings} clase="NavbarButton" />
                    </li>
                </ul>
                <SettingsModal isOpen={isSettingsOpen} onClose={() => setIsSettingsOpen(false)} /> {/* Cierra el modal */}
            </nav>
        </header>
    );
}

export default TodoNavBar;
