<script>
	import { onMount } from "svelte";
    import { navigate } from "svelte-navigator";

	let cartProducts = [];
    
    async function fetchCart() {
        const response = await fetch("/auth/cart");
		const { data } = await response.json();
		cartProducts = data;

        if(response.status === 403){
            window.location.href = "/login";
        }
    }
	
	onMount(async () => {
		fetchCart();
	});

    async function removeFromCart(id) {
        const response = await fetch("/auth/cart/" + id, { method: "DELETE" });
        fetchCart();
    }

    async function removeAllFromCart(id) {
        const response = await fetch("/auth/cart/" + id + "/all", { method: "DELETE" });
        fetchCart();
    }

    async function addToCart(id) {
        const settings = {
            	method: "POST",
            	headers: {
                	"Accept": "application/json",
                	"Content-Type": "application/json",
            	},
            	body: JSON.stringify({
                	productID: id
            	})
        	};

		const response = await fetch("/auth/cart", settings);
        fetchCart();
    }

    async function checkout() {
        const response = await fetch("/auth/cart/checkout");
        
        if(response.status === 200){
            navigate("/ordercomplete");
        }
    }
</script>

<div class="container">
    {#if cartProducts.length > 0}
        <table>
            {#each cartProducts as product}
                <tr>
                    <td>
                        <img src="images/{product.image}" alt="product" width=50, height=100%>
                    </td>
                    <td class="name">
                        <h2>{product.name}</h2>
                    </td>
                    <td>
                        <button on:click={() => removeFromCart(product.id)}>
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M18 12H6" />
                            </svg></button>
                    </td>
                    <td>
                        <h4>{product.amount}</h4>
                    </td>
                    <td>
                        <button on:click={() => addToCart(product.id)}>
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                            </svg></button>
                    </td>
                    <td>
                        <h4>{(parseFloat(product.price) * product.amount).toFixed(2)}</h4>
                    </td>
                    <td>
                        <button on:click={() => removeAllFromCart(product.id)}>
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                        </button>
                    </td>
                </tr>
            {/each}
        </table>

        <hr>

        <h2>Total: {cartProducts.reduce((sum, product) => { return parseFloat(sum) + parseFloat(product.price) * product.amount }, 0).toFixed(2)} DKK</h2>

        <button on:click={checkout} class="checkout">Checkout</button>
    {:else}
        <div class="simplecontainer">
            <h1>No products in cart</h1>
        </div>
    {/if}
    
</div>

<style>
.name {
    text-align: left;
}

h4 {
    padding: 0px 3px;
}
td {
    padding: 18px 0px;
    border-bottom: 1px solid black;
    text-align: center;
}
.checkout {
    padding: 10px 18px;
}

table {
    border-collapse: collapse;
}

.h-6 {
    color: rgb(255, 255, 255);
    width: 22px;
    vertical-align: bottom;
}

button {
    padding: 4px 12px;
}


.container {
  width: 600px;
  margin: auto;
  margin-top: 4%;
  display: flex;
  flex-direction: column;
}

h2 {
    margin: 0;
}

@media screen and (max-width: 620px) {
  .container {
    width: 350px;
  }
}
</style>