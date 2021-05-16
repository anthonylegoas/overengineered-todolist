import { writable } from "svelte/store";

const { subscribe, update: updateTodos, set: setTodos } = writable([]);
const todos = { subscribe };

export { todos, setTodos, updateTodos }