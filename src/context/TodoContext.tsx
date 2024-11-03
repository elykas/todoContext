import {
    createContext,
    FC,
    ReactNode,
    useContext,
    useEffect,
    useState
  } from "react";
import { Todo } from "../types/Todo";
import axios from "axios";


  const BASE_URL = `${import.meta.env.VITE_API_URL}`;

  
  interface UserProviderProps {
    children: ReactNode;
  }
  
  interface TodoContextProps {
    todos:Todo[];
    isLoading:boolean;
    addTodo:(title:string) => Promise<void>;
    deleteTodo:(id:string) => Promise<void>;
    toggleCompletion:(id:string) => Promise<void>;

  }
  
  const TodoContext = createContext<TodoContextProps>({
    todos:[],
    isLoading:true,
    addTodo:async () => {},
    deleteTodo:async ()=>{},
    toggleCompletion: async()=>{}

  });
  
  export const TodoProvider: FC<UserProviderProps> = ({ children }) => {
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [todos, setTodos] = useState<Todo[]>([]);

  const getTodo = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get<Todo[]>(BASE_URL);
      setTodos(response.data);
    } catch (error) {
      console.error("error featching data", error);
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    getTodo();
  }, []);

  const addTodo = async (title: string): Promise<void> => {
    try {
      const response = await axios.post<Todo>(BASE_URL, {
        title,
        completed: false,
      });
      getTodo();
    } catch (error) {
      console.error("cant add todo", error);
    }
  };

  const deleteTodo = async (id: string): Promise<void> => {
    try {
      await axios.delete(`${BASE_URL}/${id}`);
      getTodo();
    } catch (error) {
      console.error("cant delete todo", error);
    }
  };
  const toggleCompletion = async (id: string): Promise<void> => {
    try {
      const singleTodo: Todo | undefined = todos.find((todo) => todo.id === id);
      if (!singleTodo) {
        throw new Error("cant find todo with this id");
      }
      await axios.put<Todo>(`${BASE_URL}/${id}`, {
        ...singleTodo,
        completed: !singleTodo.completed,
      });
      getTodo();
    } catch (error) {
      console.error("cant toogle todo", error);
    }
  };
    return (
      <TodoContext.Provider
      value={{ todos, isLoading, addTodo, deleteTodo, toggleCompletion }}>
        {children}
      </TodoContext.Provider>
    );
  };
  
  export const useTodoContext = () => {
    const context = useContext(TodoContext);
    if (!context) {
      throw new Error("useTodoContext must be used within a TodoProvider");
    }
    return context;
  };
  export {TodoContext}

  
  