import PropTypes from "prop-types";
import { useContext, useState } from "react";
import { TaskContext } from "../context/TaskContext";
import CustomButton from './Button';
import CustomInput from './Input';

const CardTarea = ({ tarea }) => {
    const { deleteTask, toggleTask} = useContext(TaskContext);
    const [ isChecked, setIsChecked ] = useState(false);

    if (!tarea) {
        return <div>Datos de la tarea no disponibles</div>;
    }

    const { id, nombre, fechaLimite, horaLimite, tipoTarea } = tarea;

    const handleCheckboxChange = () => {
        setIsChecked(!isChecked);
        toggleTask(id);
    };

    const handleDelete = () => {
        deleteTask(id);
    };

    return (
        <div className="card">
            <CustomInput
                type="checkbox"
                checked={isChecked}
                onChange={handleCheckboxChange}
            />
            <h5 className="card-title">{nombre}</h5>
            <p className="card-text">Fecha Límite: {fechaLimite}</p>
            <p className="card-text">Hora Límite: {horaLimite}</p>
            <p className="card-text">Tipo de Tarea: {tipoTarea}</p>
            {isChecked && (
                <CustomButton className="CardButton"  label="Eliminar" funcion={handleDelete}>
                    Eliminar
                </CustomButton>
            )}
        </div>
    );
};

CardTarea.propTypes = {
    tarea: PropTypes.shape({
        id: PropTypes.string.isRequired,
        nombre: PropTypes.string.isRequired,
        fechaLimite: PropTypes.string.isRequired,
        horaLimite: PropTypes.string.isRequired,
        tipoTarea: PropTypes.string.isRequired,
    }).isRequired,
};

export default CardTarea;
