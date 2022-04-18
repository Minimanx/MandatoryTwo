<script>
    import { navigate } from "svelte-navigator";
    import { error, success } from "../components/toasts/toastThemes.js";
    
    let name = "";
    let address = "";
    let email = "";
    let password = "";
    let repeatPassword = "";
    
    async function signUp() {
        if(name === "" || address === "" || email === "" || password === "" || repeatPassword === "") {
            error("All fields must be filled out");
            return;
        }
        if(password !== repeatPassword) {
            error("Passwords must match");
            return;
        }
        const settings = {
            	method: "POST",
            	headers: {
                	"Accept": "application/json",
                	"Content-Type": "application/json",
            	},
            	body: JSON.stringify({
                	name: name,
                    address: address,
                    email: email,
                    password: password
            	})
        };

        const response = await fetch("/signup", settings);

        if(response.status === 200) {
            navigate("/login");
        }
    }
</script>

<div class="form-container">
    <div class="form">
        Name: <input bind:value={name} required>
        Address: <input bind:value={address} required>
        Email: <input bind:value={email} required>
        Password: <input bind:value={password} type="password" required>
        Repeat Password: <input bind:value={repeatPassword} type="password" required>
        <button on:click={signUp}>Create User</button>
    </div>
</div>

<style>
input:focus {
  outline-color: #b8dab8;
}

button {
  background-color: rgb(41, 41, 41);
  color: white;
  font-size: 20px;
  padding: 10px 30px;
  width: 50%;
  margin: auto;
  border: none;
  cursor: pointer;
  border-radius: 100px 100px 100px 100px;
  font-weight: 100;
}

button:hover {
  background-color: rgb(34, 34, 34);
}

.form-container {
  width: 400px;
  margin: auto;
  margin-top: 4%;
  display: flex;
  flex-direction: column;
}

.form {
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  border: 1px #ddd solid;
  border-radius: 2px;
  margin: 0 0 30px 0;
  padding: 6%;
  gap: 8px;
}

.form input {
  height: 40px;
  border: 1px solid #8b8b8b;
  padding: 3px 7px;
  line-height: 1.2;
}

</style>