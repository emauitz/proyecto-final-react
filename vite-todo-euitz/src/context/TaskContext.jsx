import { createContext, useReducer, useEffect } from 'react';
import PropTypes from 'prop-types';
import { collection, setDoc, getDocs, deleteDoc, doc, updateDoc, query, where, addDoc } from 'firebase/firestore';
import { db } from '../config/firebase';
import { getAuth } from 'firebase/auth';

// Crear el contexto para el manejo de tareas
export const TaskContext = createContext();

// Define el proveedor del contexto y el inicializador del estado
export const TaskProvider = ({ children }) => {
    const initialState = {
        tasks: []
    };

    const reducer = (state, action) => {
        switch (action.type) {
            case 'ADD_TASK':
                return {
                    ...state,
                    tasks: [...state.tasks, action.payload]
                };
            case 'DELETE_TASK':
                return {
                    ...state,
                    tasks: state.tasks.filter(task => task.id !== action.payload)
                };
            case 'TOGGLE_TASK':
                return {
                    ...state,
                    tasks: state.tasks.map(task =>
                        task.id === action.payload ? { ...task, completed: !task.completed } : task
                    )
                };
            case 'LOAD_TASKS':
                return {
                    ...state,
                    tasks: action.payload
                };
            default:
                return state;
        }
    };

    const [state, dispatch] = useReducer(reducer, initialState);

    useEffect(() => {
        const loadTasks = async () => {
            try {
                const auth = getAuth();
                const user = auth.currentUser;
                if (!user) {
                    console.log("No hay usuario autenticado");
                    return;
                }

                console.log("Usuario autenticado:", user.uid);
                const q = query(collection(db, 'tareas'), where('userId', '==', user.uid));
                const querySnapshot = await getDocs(q);
                const tareas = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                console.log("Tareas cargadas:", tareas);
                dispatch({ type: 'LOAD_TASKS', payload: tareas });
            } catch (error) {
                console.error("Error cargando tareas:", error);
            }
        };
        loadTasks();
    }, []);

    const addTask = async (newTask) => {
        try {
            const auth = getAuth();
            const user = auth.currentUser;
            if (!user) {
                console.log("No hay usuario autenticado");
                return;
            }

            const taskWithUserId = { ...newTask, userId: user.uid };
            console.log("Añadiendo tarea:", taskWithUserId);
            const docRef = await addDoc(collection(db, 'tareas'), taskWithUserId);
            const addedTask = { ...taskWithUserId, id: docRef.id };
            console.log("Tarea añadida:", addedTask);
            dispatch({ type: 'ADD_TASK', payload: addedTask });
        } catch (error) {
            console.error("Error añadiendo tarea:", error);
        }
    };

    const deleteTask = async (id) => {
        try {
            await deleteDoc(doc(db, 'tareas', id));
            console.log(`Tarea con id ${id} eliminada`);
            dispatch({ type: 'DELETE_TASK', payload: id });
        } catch (error) {
            console.error("Error eliminando tarea:", error);
        }
    };

    const toggleTask = async (id) => {
        try {
            const task = state.tasks.find(task => task.id === id);
            if (task) {
                await updateDoc(doc(db, 'tareas', id), { completed: !task.completed });
                console.log(`Tarea con id ${id} marcada`);
                dispatch({ type: 'TOGGLE_TASK', payload: id });
            }
        } catch (error) {
            console.error("Error marcando tarea:", error);
        }
    };

    return (
        <TaskContext.Provider value={{ state, dispatch, addTask, deleteTask, toggleTask }}>
            {children}
        </TaskContext.Provider>
    );
};

TaskProvider.propTypes = {
    children: PropTypes.node.isRequired
};

export default TaskProvider;
