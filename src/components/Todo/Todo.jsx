import React, { useState, useEffect } from "react";

function Todo() {
    const [todos, setTodos] = useState([]);

    useEffect(() => {
        const storedTodos = JSON.parse(localStorage.getItem("todos"));
        if (storedTodos) {
            setTodos(storedTodos);
        }
    }, []);

    useEffect(() => {
        localStorage.setItem("todos", JSON.stringify(todos));
    }, [todos]);

    const handleAddTodo = (event) => {
        event.preventDefault();
        const newTodo = event.target.elements.todo.value.trim();
        if (newTodo !== "") {
            setTodos([...todos, newTodo]);
            event.target.elements.todo.value = "";
        }
    };

    const handleDeleteTodo = (index) => {
        const newTodos = [...todos];
        newTodos.splice(index, 1);
        setTodos(newTodos);
    };

    return (
        <div className="row p-3">
            <div className="col-12 text-center">
                <form onSubmit={handleAddTodo}>
                    <input className="todo_input" type="text" name="todo" placeholder="Задача" />
                    <button className="todo_btn_add" type="submit">+</button>
                </form>
                <ul className="todos_list">
                    {todos.map((todo, index) => (
                        <li key={index}>
                            {todo}
                            <button className="todo_btn_del" onClick={() => handleDeleteTodo(index)}>-</button>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default Todo;
