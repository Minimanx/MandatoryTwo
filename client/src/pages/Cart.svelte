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

{#if cartProducts.length > 0}
    <table>
        {#each cartProducts as product}
            <tr>
                <td>
                    <img src="images/{product.image}" alt="product" width=50, height=100%>
                </td>
                <td>
                    <h2>{product.name}</h2>
                </td>
                <td>
                    <button on:click={() => removeFromCart(product.id)}>-</button>
                </td>
                <td>
                    <h4>{product.amount}</h4>
                </td>
                <td>
                    <button on:click={() => addToCart(product.id)}>+</button>
                </td>
                <td>
                    <h3>{(parseFloat(product.price) * product.amount).toFixed(2)}</h3>
                </td>
                <td>
                    <button on:click={() => removeAllFromCart(product.id)}>Remove from cart</button>
                </td>
            </tr>
        {/each}
    </table>

    <h2>Total: {cartProducts.reduce((sum, product) => { return parseFloat(sum) + parseFloat(product.price) * product.amount }, 0).toFixed(2)}</h2>

    <button on:click={checkout}>Checkout</button>
{:else}
    <h1>No products in cart</h1>
{/if}