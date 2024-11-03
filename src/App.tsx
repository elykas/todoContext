import React, { FC } from 'react'
import { TodoProvider } from "./context/TodoContext";
import TodoList from './components/TodoList/TodoList';

const App:FC = () => {
  return (
    <TodoProvider>
      <TodoList/>
    </TodoProvider>
  )
}

export default App