<script>
	import { onMount } from "svelte";
	import { navigate } from "svelte-navigator";
	import { user } from "../stores/userStore.js";
	import { error, success } from "../components/toasts/toastThemes.js";

    export let id;
	let plant = {};
	
	onMount(async () => {
		const response = await fetch("/api/plants/" + id);
		const { data } = await response.json();
        console.log(data);
		plant = data;
        console.log(plant);
	});

	async function addToCart() {
		if($user.loggedIn === true){
			const settings = {
            	method: "POST",
            	headers: {
                	"Accept": "application/json",
                	"Content-Type": "application/json",
            	},
            	body: JSON.stringify({
                	productID: plant.id
            	})
        	};

			await fetch("/auth/cart", settings);
			success("Product added to cart");
		}else {
			error("You must be logged in to use the cart");
		}
		
	}

</script>

<h1>{plant.name}</h1>
<button on:click={addToCart}>Add To Cart</button>