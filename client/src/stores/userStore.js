import { writable } from "svelte/store";


const localUser = localStorage.getItem("user");
export const user = writable(JSON.parse(localUser) || {loggedIn: false});
user.subscribe(val => localStorage.setItem("user", JSON.stringify(val)));
