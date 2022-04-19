<script>
	import { onMount } from "svelte";
	import { user } from "../stores/userStore.js";
	import { error, success } from "../components/toasts/toastThemes.js";

    export let id;

	let plant = {};
	
	onMount(async () => {
		const response = await fetch("/api/plants/" + id);
		const { data } = await response.json();
		plant = data;
	});

	async function addToCart() {
		if($user.loggedIn === true) {
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

		} else {
			error("You must be logged in to use the cart");
		}
	}

</script>

<div class="container">
	<img src="../images/{plant.image}" alt="Avatar">
	<div class="contentcontainer">
		<div>
			<h1>{plant.name}</h1>
			<h3>Sun: {plant.sun}</h3>
			<h3>Water: {plant.water}</h3>
		</div>
		<h4>{plant.description}</h4>
		<div class="buycontainer">
			<h2>{parseFloat(plant.price).toFixed(2)} DKK</h2>
			<button on:click={addToCart}>Add To Cart</button>
		</div>
	</div>
</div>

<style>
	.container {
		width: 50%;
		margin: 20px auto;
		display: flex;
		justify-content: space-around;
	}

	img {
		width: 60%;
		height: auto;
	}

	.contentcontainer {
		display: flex;
		flex-direction: column;
		justify-content: space-between;
	}

	@media screen and (max-width: 700px) {
  		.container {
			width: 90%;
			flex-direction: column;
			align-items: center;
		  }
  	}
	@media screen and (max-width: 1200px) {
  		.container {
			width: 70%;
		  }
  	}
</style>