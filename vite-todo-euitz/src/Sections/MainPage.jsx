
import TodoNavBar from "./NavBar.jsx"
import Cotizaciones from "./ApiDolar.jsx"
import ContainerTodo from "./ContainerTodo.jsx";
import Footer from "./Footer.jsx"
import ContainerList from "./ContainerTodoList.jsx";

function MainPage () {

    return (
        <>
            <TodoNavBar />
            <ContainerTodo />
            <ContainerList />
            <Cotizaciones /> 
            <Footer />
        </>
    );
};

export default MainPage;