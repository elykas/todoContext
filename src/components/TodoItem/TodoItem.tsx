import React from "react";
import "./TodoItem.css";
import { Todo } from "../../types/Todo";
import { useTodoContext } from "../../context/TodoContext";
import "./TodoItem.css"

interface TodoItemProps {
  todo: Todo;
}
const TodoItem: React.FC<TodoItemProps> = ({ todo }) => {
    const {deleteTodo,toggleCompletion} = useTodoContext();
  return (
    <li className={`todo-item ${todo.completed ? "completed" : ""} `}>
      <div
        className="todo-status-and-text"
        onClick={() => toggleCompletion(todo.id)}
      >
        <span>{todo.completed ? "✔️" : "❌"}</span>
        <span>{todo.title}</span>
      </div>
      <button onClick={() => deleteTodo(todo.id)}>Delete</button>
    </li>
  );
};

export default TodoItem;
