<script lang="ts">
  import { applyAction, enhance } from '$app/forms';
  import type { SubmitFunction } from '@sveltejs/kit';

  import type { ActionData } from './login/$types';

  export let form: ActionData;

  const login: SubmitFunction = () => {
    return async ({ result }) => {
      await applyAction(result);
    };
  };
</script>

<pre>
  {JSON.stringify(form, null, 2)}
</pre>

<h1>Forms</h1>

<form method="POST" action="/login" use:enhance={login}>
  <label>
    <span>User: </span>
    <input type="text" name="user" value={form?.data?.user ?? ''} />

    {#if form?.errors.user}
      <p class="error">Name is required.</p>
    {/if}
  </label>

  <label>
    <span>Password: </span>
    <input type="password" name="password" />

    {#if form?.errors?.password}
      <p class="error">Password is required.</p>
    {/if}
  </label>

  <button type="submit">Login</button>
</form>

<style>
  .error {
    color: tomato;
  }
</style>
