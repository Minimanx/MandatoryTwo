<script>
  import { Link } from "svelte-navigator";
  export let objects;
</script>

<div class="row">
  {#each objects as object}
      <div class="column">
        <Link to="/plants/{object.id}">
          <div class="card">
              <img src="images/{object.image}" alt="Avatar" style="width:100%">
              <div class="container">
                <h5>{object.name}</h5>
                <p><b>{object.price.toFixed(2)} DKK</b></p>
              </div>
          </div>
        </Link>
      </div>
  {/each}
</div>

<style>
h5 {
  color: gray;
  margin-bottom: 0px;
  margin-top: 10px;
  font-weight: 400;
  font-size: 1em;
}
p {
  margin-top: 2px;
}

.row {
	display: flex;
	justify-content: center;
  align-items: center;
  margin-top: 1%;
  flex-wrap: wrap;
}

.column {
  width: 23%;
  padding: 0 10px;
}

@media screen and (max-width: 600px) {
  .column {
    width: 100%;
    margin-bottom: 20px;
  }
  .row {
    flex-direction: column;
  }
}
</style>