import PropTypes from 'prop-types';

function CustomInput({ placeholder, type, value, name, clase, onChange }) {
    return (
        <input
            placeholder={placeholder}
            type={type}
            value={value}
            name={name}
            className={clase}
            onChange={onChange}
        />
    );
}

CustomInput.propTypes = {
    placeholder: PropTypes.string,
    type: PropTypes.string.isRequired,
    value: PropTypes.string,
    name: PropTypes.string,
    clase: PropTypes.string,
    onChange: PropTypes.func.isRequired,
};

export default CustomInput;
