import { useContext }  from 'react';
import { TaskContext } from './TaskContext';

const useTaskContext = () => useContext(TaskContext);

export default useTaskContext;
