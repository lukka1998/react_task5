import React, { useState, useEffect } from 'react';
import axios from 'axios';

const TodoList = () => {
  const [todos, setTodos] = useState([]);
  const [newTask, setNewTask] = useState('');


  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const response = await axios.get('https://jsonplaceholder.typicode.com/todos?_limit=10');
        setTodos(response.data);// icvleba todos
      } catch (error) {
        console.log('Error', error);
      }
    };

    fetchTodos();
  }, []);

  useEffect(() => {
    console.log('updated todos:', todos);//every time cponsole log
  }, [todos]);//rodesac todos change

  const chekcompleted = (id) => {
    setTodos(todos.map(todo => 
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  
  const addTask = () => {
    if (newTask.trim()) {//vamowmebt carielia tu ara input value
      const newTodo = {
        userId: 1,
        id: todos.length + 1, 
        title: newTask,
        completed: false,
      };
      setTodos([...todos, newTodo]);//vamatebt arrray shi netodos spread operatoris damxarebit
      setNewTask('');
    }
  };

  return (
    <div style={{margin:"auto",display:"flex" ,flexDirection:"column", justifyContent:"center",alignItems:"center", width:"100%" ,height:"100vh" }}>
      <h1>Todo List</h1>
      <div style={{display:"flex" , gap:"10px"}}>
        <input style={{padding:"10px 20px" ,width:"200px"}}
          type="text"value={newTask} onChange={(e) => setNewTask(e.target.value)}placeholder="Enter a new task"
        />
        <button  style={{padding:"10px 20px"}} onClick={addTask}>Add Task</button>
      </div>
      <ul>
        {todos.map(todo => (
          <li key={todo.id} style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}>
            <input type="checkbox"checked={todo.completed} onChange={() => chekcompleted(todo.id)}
            />
            {todo.title}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;
