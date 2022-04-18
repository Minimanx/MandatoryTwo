<script>
    import { user } from "../stores/userStore.js";
    import { navigate } from "svelte-navigator";
    import { onMount } from "svelte";
    import Cards from "../components/card/Cards.svelte";

    let plants = [];

    onMount(async () => {
        const response = await fetch("/api/plants/popular");
        const { data } = await response.json();
        plants = data;
    });
</script>


<div class="container">
    <img src="images/frontpage.jpg" alt="Cover">
    <button on:click="{() => navigate("/plants")}">Explore</button>
</div>

<h2>Popular products</h2>

<Cards objects={plants} />


<style>
h2 {
  margin-left: 2%;
  margin-bottom: 0px;
}

.container {
  position: relative;
  width: 100%;
}

.container img {
  width: 100%;
  height: 500px;
  object-fit: cover;
  object-position: 0% 60%;
}
@media only screen and (max-width: 800px) {
    .container img {
    height: 300px;
  }
}

button {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 20px;
  padding: 16px 40px;
}

button:hover {
  background-color: rgb(34, 34, 34);
}
</style>