<script context="module">
	// fetch todos here
</script>

<script>
	import { scale } from 'svelte/transition';
	import { flip } from 'svelte/animate';
	import { onMount } from 'svelte';
	import { todos, addTodo, deleteTodo, toggleTodoStatus } from '../../hooks/useTodos'

	const addTodoHandler = (event) => addTodo(event.detail.value);
	const deleteTodoHandler = (id) => deleteTodo(id);
	const toggleTodoStatusHandler = (id) => toggleTodoStatus(id);

	onMount(() => import('$lib/Todo/TodoInput'))
</script>

<svelte:head>
	<title>Todos</title>
</svelte:head>

<div class="wrapper">
	<h1>Todos</h1>
	
	<div class="new">
		<todo-input placeholder="Add toto" on:add-todo={addTodoHandler}></todo-input>
	</div>

	<ul class="todos">
		{#each $todos as todo (todo.id)}
			<li
				class="todo"
				class:done={todo.done}
				transition:scale|local={{ start: 0.7 }}
				animate:flip={{ duration: 200 }}
			>
				<button aria-label="Mark todo as {todo.done ? 'not done' : 'done'}" class="toggle" on:click={() => toggleTodoStatusHandler(todo.id)}/>
				<p>{todo.text}</p>
				<button aria-label="Delete todo" class="delete" on:click={() => deleteTodoHandler(todo.id)}/>
			</li>
		{/each}
	</ul>
</div>

<style>
	.wrapper {
		width: 100%;
		max-width: var(--column-width);
		margin: var(--column-margin-top) auto 0 auto;
		line-height: 1;
	}

	.new {
		margin: 0 0 0.5rem 0;
	}

	.todos {
		padding: 0;
	}
	.todo {
		display: grid;
		grid-template-columns: 2rem 1fr 2rem;
		grid-gap: 0.5rem;
		align-items: center;
		margin: 0 0 0.5rem 0;
		padding: 0.5rem;
		background-color: white;
		border-radius: 8px;
		filter: drop-shadow(2px 4px 6px rgba(0, 0, 0, 0.1));
		transform: translate(-1px, -1px);
		transition: filter 0.2s, transform 0.2s;
	}
	.done {
		transform: none;
		opacity: 0.4;
		filter: drop-shadow(0px 0px 1px rgba(0, 0, 0, 0.1));
	}
	.todo button {
		width: 2em;
		height: 2em;
		border: none;
		background-color: transparent;
		background-position: 50% 50%;
		background-repeat: no-repeat;
	}
	button.toggle {
		border: 1px solid rgba(0, 0, 0, 0.2);
		border-radius: 50%;
		box-sizing: border-box;
		background-size: 1em auto;
	}
	.done .toggle {
		background-image: url("data:image/svg+xml,%3Csvg width='22' height='16' viewBox='0 0 22 16' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M20.5 1.5L7.4375 14.5L1.5 8.5909' stroke='%23676778' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E");
	}
	.delete {
		background-image: url("data:image/svg+xml,%3Csvg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M4.5 5V22H19.5V5H4.5Z' fill='%23676778' stroke='%23676778' stroke-width='1.5' stroke-linejoin='round'/%3E%3Cpath d='M10 10V16.5' stroke='white' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/%3E%3Cpath d='M14 10V16.5' stroke='white' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/%3E%3Cpath d='M2 5H22' stroke='%23676778' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/%3E%3Cpath d='M8 5L9.6445 2H14.3885L16 5H8Z' fill='%23676778' stroke='%23676778' stroke-width='1.5' stroke-linejoin='round'/%3E%3C/svg%3E%0A");
		opacity: 0.2;
	}
	.delete:hover,
	.delete:focus {
		transition: opacity 0.2s;
		opacity: 1;
	}
</style>
