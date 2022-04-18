<script>
	import { onMount } from "svelte";
	import Cards from "../components/card/Cards.svelte";

	let plants = [];
	
	onMount(async () => {
		const response = await fetch("/api/plants");
		const { data } = await response.json();
		plants = data;
	});

	let priceSortOrder = true;

	function sortByPrice() {
		if(priceSortOrder){
			plants.sort((a, b) => {
				return  b.price - a.price;
			});
		}else{
			plants.sort((a, b) => {
				return   a.price - b.price;
			});
		}
		priceSortOrder = !priceSortOrder;
		plants = plants;
	}

	let nameSortOrder = true;

	function sortByName() {
		if(nameSortOrder){
			plants.sort((a, b) => {
				if(a.name > b.name){
					return 1;
				}
				if(a.name < b.name){
					return -1;
				}
			});
		}else {
			plants.sort((a, b) => {
				if(a.name < b.name){
					return 1;
				}
				if(a.name > b.name){
					return -1;
				}
			});
		}


		nameSortOrder = !nameSortOrder;
		plants = plants;
	}

</script>

<div class="sort">
	<button on:click={sortByPrice}>Sort Price</button>
	<button on:click={sortByName}>Sort Name</button>
</div>


<Cards objects={plants} />

<style>
	.sort {
		margin: 2% 0 0 2%;
	}
</style>