import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addTask } from '../redux/actions';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const TaskInput = ({ onAddTask }) => {
  const [task, setTask] = useState('');
  const [difficulty, setDifficulty] = useState('Easy');
  const [dueDate, setDueDate] = useState(new Date());
  const dispatch = useDispatch();

  const handleAddTask = (e) => {
    e.preventDefault();
    if (task) {
      const newTask = { id: Date.now(), text: task, difficulty, dueDate };
      dispatch(addTask(newTask));
      onAddTask(newTask); // Call the function to handle weather fetching
      setTask('');
      setDifficulty('Easy');
      setDueDate(new Date());
    }
  };

  return (
    <form onSubmit={handleAddTask}>
      <input
        type="text"
        value={task}
        onChange={(e) => setTask(e.target.value)}
        placeholder="Add a new task"
        required
      />
      <select value={difficulty} onChange={(e) => setDifficulty(e.target.value)}>
        <option value="Easy">Easy</option>
        <option value="Medium">Medium</option>
        <option value="Hard">Hard</option>
      </select>
      <DatePicker selected={dueDate} onChange={(date) => setDueDate(date)} />
      <button type="submit">Add Task</button>
    </form>
  );
};

export default TaskInput;