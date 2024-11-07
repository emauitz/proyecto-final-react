
import PropTypes from 'prop-types';

function SettingsModal({ isOpen, onClose }) {
    if (!isOpen) return null; 

    return (
        <div>
            <div>
                <h2>Configuración</h2>
                <p>Esta sección está en construcción.</p>
                <button onClick={onClose}>Cerrar</button> 
            </div>
        </div>
    );
}

SettingsModal.propTypes = {
    isOpen: PropTypes.bool.isRequired, 
    onClose: PropTypes.func.isRequired 
};

export default SettingsModal;
