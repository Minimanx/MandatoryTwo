<script>
    import { onMount } from "svelte";
    import { navigate } from "svelte-navigator";
    import { user } from "../stores/userStore.js";

    let clientUser = {};

    onMount(async () => {
        const response = await fetch("/auth/account");
        const { data } = await response.json();
        clientUser = data;
 
        if(response.status === 403) {
            window.location.href = "/login";
        }
    });

    async function logout() {
        const response = await fetch("/auth/logout/" + $user.id);
        if(response.status === 200) {
            localStorage.clear();
            user.set({loggedIn: false});
            navigate("/");
        }
    }
</script>
<div class="simplecontainer">
    <h1>{clientUser.name}</h1>
    <button on:click={logout}>Logout</button>
</div>
