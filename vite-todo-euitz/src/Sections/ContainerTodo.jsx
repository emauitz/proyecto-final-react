
import NewTodo from '../ComponentesContainerTodo/NewTodo.jsx';
import PerfilTodo from '../ComponentesContainerTodo/PerfilTodo.jsx';


function ContainerTodo() {
    return (
        <section className="ContainerTodo">
            <PerfilTodo />
            <NewTodo />
        </section>
    );
}

export default ContainerTodo;
