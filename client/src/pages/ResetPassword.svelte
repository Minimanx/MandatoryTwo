<script>
	import { onMount } from "svelte";
    import { error } from "../components/toasts/toastThemes";
    import { navigate } from "svelte-navigator";

    export let token;
    let email = "";
    let password = "";
    let repeatPassword = "";
	
	onMount(async () => {
		const response = await fetch("/api/resetpassword/" + token);
		const { data } = await response.json();
        if(response.status === 401) {
            window.location.href = "/";
        }else {
            email = data.email;
        }
        
	});

    async function changePassword() {
        if(password !== repeatPassword) {
            error("Passwords must match");
            return;
        }
        const settings = {
            	method: "PATCH",
            	headers: {
                	"Accept": "application/json",
                	"Content-Type": "application/json",
            	},
            	body: JSON.stringify({
                	newPassword: password,
                    token: token,
                    email: email
            	})
        	};
        const response = await fetch("/api/resetpassword/", settings);
		const { message } = await response.json();

        navigate("/login");
    }
</script>

<h1>Change password for: {email}</h1>

Password: <input bind:value={password} type="password">
Repeat Password: <input bind:value={repeatPassword} type="password">
<button on:click={changePassword}>Update</button>