<script>
import { user } from "../stores/userStore.js";
import { navigate } from "svelte-navigator";
import { error, success } from "../components/toasts/toastThemes.js";

let email = "";
let password = "";
let forgotEmail = "";

async function validateLogin() {
  if(email == "") {
    error("Email must be filled out");
  } else {
    const settings = {
        method: "POST",
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
          clientUser: {
            email: email,
            password: password
          }
        })
    };

    const response = await fetch("/login", settings);
		const data = await response.json();

    if(response.status === 401) {
      error("Wrong Password");
      return;
    }
    if(response.status === 400) {
      error("Wrong Email");
      return;
    }
    if(response.status === 200) {
      user.set({loggedIn: true, id: data.id, name: data.name, email: data.email});
      navigate("/");
    }
  }
}

async function forgotPassword() {
  if(forgotEmail == "") {
    error("Email must be filled out");
  } else {
    const settings = {
        method: "POST",
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: forgotEmail
        })
    };

    const response = await fetch("/forgotpassword", settings);
		const data = await response.json();

    success("If an account with this email exists, a mail has been sent");

  }
}

</script>

<div class="form-container">
  <div class="form">
    Email: <input bind:value={email}>
    Password: <input bind:value={password} type="password">
    <button on:click={validateLogin}>Login</button>

    <h3>Forgot your password? Fill out the form below and an email will be sent to you</h3>
    Email: <input bind:value={forgotEmail}>
    <button on:click={forgotPassword}>Forgot Password</button>
  </div>
</div>

<style>
input:focus {
  outline-color: #b8dab8;
}

button {
  background-color: rgb(41, 41, 41);
  color: white;
  font-size: 1.1em;
  padding: 10px 30px;
  width: 55%;
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