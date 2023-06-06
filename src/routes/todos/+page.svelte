<script lang="ts">
  import { invalidate } from '$app/navigation';
  import type { Data } from '$lib/types';
  import type { PageData } from './$types';

  export let data: PageData;

  $: ({ todos } = data);

  let form: Data;

  async function addTodo(event: Event): Promise<void> {
    const formEl = event.target as HTMLFormElement;
    const data = new FormData(formEl);

    const response = await fetch(formEl.action, {
      method: 'POST',
      body: data,
    });
    const responseData = await response.json();
    form = responseData;

    formEl.reset();

    await invalidate('todos');
  }

  async function removeTodo(event: Event): Promise<void> {
    const formEl = event.target as HTMLFormElement;
    const data = new FormData(formEl);

    await fetch(formEl.action, {
      method: 'DELETE',
      body: data,
    });

    await invalidate('todos');
  }
</script>

<form method="post" on:submit|preventDefault={addTodo}>
  <label>
    <span>Todo:</span>
    <input type="text" name="todo" />

    {#if !!form && !form.success}
      <p class="error">{form.errors?.todo || 'something went wrong.'}</p>
    {/if}
  </label>

  <button type="submit">+ Add Todo</button>
</form>

{#if form?.success}
  <p>Added todo! 😎</p>
{/if}

<ul>
  {#each todos as todo}
    <li>
      <span>{todo.text}</span>
      <form method="post" on:submit|preventDefault={removeTodo}>
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

  span,
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
