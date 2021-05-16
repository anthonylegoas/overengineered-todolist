import { v4 as uuid } from '@lukeed/uuid';
import { todos, updateTodos } from '../stores'

const getTodos = () => {
    // GET /todos
    setTodos([])
}

const addTodo = (newTodoText) => {
    const newTodo = { id: uuid(), text: newTodoText, done: false };
    // POST /todos/:id
    updateTodos((allTodos) => [newTodo, ...allTodos]);
}

const deleteTodo = (todoId) => {
    // DELETE /todos/:id
    updateTodos((allTodos) => allTodos.filter((t) => t.id !== todoId));
}

const toggleTodoStatus = (todoId) => {
    // PATCH /todos/:id
    updateTodos((allTodos) => allTodos.map((t) => {
        if(t.id === todoId) t.done = !t.done;
        return t;
    }));
}


export { todos, addTodo, deleteTodo, getTodos, toggleTodoStatus }