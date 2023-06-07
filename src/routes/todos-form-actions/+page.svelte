<script lang="ts">
  import { enhance } from '$app/forms';
  import type { ActionData, PageData, SubmitFunction } from './$types';

  export let data: PageData;
  export let form: ActionData;

  let loading = false;

  $: ({ todos } = data);

  const addTodoInterceptor: SubmitFunction = ({ data, cancel }) => {
    const todo = String(data.get('todo'));

    if (!todo.trim()) {
      form = { missing: true, todo: '' };
      cancel();
    }

    loading = true;

    return async ({ update }) => {
      loading = false;
      update();
    };
  };
</script>

<form method="post" action="?/addTodo" use:enhance={addTodoInterceptor}>
  <label>
    <span>Todo:</span>
    <input
      disabled={loading}
      type="text"
      name="todo"
      value={form?.todo ?? ''}
    />

    {#if !!form?.missing}
      <p class="error">This field is required.</p>
    {/if}
  </label>

  <button aria-busy={loading} class:secondary={loading} type="submit"
    >{loading ? '' : '+ Add Todo'}</button
  >

  <button formaction="?/clearTodos" class="secondary" type="submit"
    >Clear</button
  >
</form>

{#if !!form?.success}
  <p>Added todo! 😎</p>
{/if}

<ul>
  {#each todos as todo}
    <li>
      <span>{todo.text}</span>
      <form method="post" action="?/removeTodo" use:enhance>
        <input type="hidden" name="id" value={todo.id} />
        <button class="delete" type="submit"> 🧨 </button>
      </form>
    </li>
  {:else}
    <li>No todos found.</li>
  {/each}
</ul>

<style>
  ul {
    padding: 0;
  }

  form {
    margin: 0;
  }

  ul li {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  p {
    text-transform: capitalize;
  }

  button.delete {
    margin: 0;
    background: none;
    border: none;
  }

  .error {
    color: tomato;
  }
</style>
