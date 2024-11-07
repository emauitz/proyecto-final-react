import PropTypes from 'prop-types';

function CustomButton({ label, funcion, clase }) {
    return (
        <button type='button' onClick={funcion} className={clase}>
            {label}
        </button>
    );
}

CustomButton.propTypes = {
    label: PropTypes.string.isRequired,
    funcion: PropTypes.func.isRequired,
    clase: PropTypes.string,
};

export default CustomButton;
