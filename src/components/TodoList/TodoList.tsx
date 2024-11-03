import { FC } from 'react'
import { useTodoContext } from '../../context/TodoContext';
import TodoForm from '../TodoForm/TodoForm';
import BasicSpinner from '../BasicSpinner/BasicSpinner';
import TodoItem from '../TodoItem/TodoItem';
import "./TodoList.css"

const TodoList:FC = () => {

    const { todos, isLoading} = useTodoContext();

  return (
    <div className='todo-list'>
        <h1>Todo List</h1>
        <TodoForm/>
        <ul>
        {isLoading ? (
          <BasicSpinner />
        ) : (
          todos.map((todo) => (
            <TodoItem
              key={todo.id}
              todo={todo}
            />
          ))
        )}
        </ul>

    </div>
  )
}

export default TodoList