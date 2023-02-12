import React, { useState } from "react";

const TodoList = () => {
    const [todos, setTodos] = useState([
        { task: "Learn React", completed: false },
        { task: "Build a to-do list", completed: true },
        { task: "Take a walk", completed: false },
    ]);

    const [searchTerm, setSearchTerm] = useState("");

    const [filter, setFilter] = useState("all");

    const handleSearch = (event) => {
        setSearchTerm(event.target.value);
    };

    const handleFilter = (event) => {
        setFilter(event.target.value);
    };

    const handleAdd = (event) => {
        event.preventDefault();
        setTodos([...todos, { task: event.target.task.value, completed: false }]);
        event.target.reset();
    };

    const handleDone = (index) => {
        const newTodos = [...todos];
        newTodos[index].completed = !newTodos[index].completed;
        setTodos(newTodos);
    };

    const filteredTodos = todos
        .filter((todo) =>
            todo.task.toLowerCase().includes(searchTerm.toLowerCase())
        )
        .filter((todo) => {
            if (filter === "all") return true;
            if (filter === "done") return todo.completed;
            if (filter === "not-done") return !todo.completed;
            return true;
        });

    return (
        <div>
            <form onSubmit={handleAdd}>
                <input type="text" name="task" placeholder="Add a task" />
                <button type="submit">Add</button>
            </form>
            <input
                type="text"
                value={searchTerm}
                onChange={handleSearch}
                placeholder="Search"
            />
            <select value={filter} onChange={handleFilter}>
                <option value="all">All</option>
                <option value="done">Done</option>
                <option value="not-done">Not done</option>
            </select>
            <ul>
                {filteredTodos.map((todo, index) => (
                    <li key={index} onClick={() => handleDone(index)}>
                        {todo.task} ({todo.completed ? "Done" : "Not done"})
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default TodoList;
