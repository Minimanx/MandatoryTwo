<script>
	import { Router, Link, Route } from "svelte-navigator";
	import Frontpage from "./pages/Frontpage.svelte";
	import Plants from "./pages/Plants.svelte";
	import Plant from "./pages/Plant.svelte";
	import Login from "./pages/Login.svelte";
	import Cart from "./pages/Cart.svelte";
	import About from "./pages/About.svelte";
	import Account from "./pages/Account.svelte";
	import { user } from "./stores/userStore.js";
	import { SvelteToast } from "@zerodevx/svelte-toast";
	import NotFound from "./pages/NotFound.svelte";
	import ResetPassword from "./pages/ResetPassword.svelte";
	import SignUp from "./pages/SignUp.svelte";
	import OrderComplete from "./pages/OrderComplete.svelte";
</script>

<SvelteToast />

<Router>
	<header>
		<nav>
			<div class="logo">
				<Link  to="/">GreenGarden</Link>
			</div>
			<Link to="/plants">Plants</Link>
			{#if $user.loggedIn === false}
			<div class="account">
				<Link to="/login">Login</Link>
				<Link to="/signup">Sign Up</Link>
			</div>
			{:else}
			<div class="account">
				{$user.name}
				<Link to="/cart">Cart</Link>
				<Link to="/account">Account</Link>
			</div>
			{/if}
		</nav>
	</header>
	<main>
		<Route path="/" component={Frontpage}></Route>
		<Route path="/plants" component={Plants} />
		<Route path="/plants/:id" component={Plant} />
		<Route path="/login" component={Login}></Route>
		<Route path="/signup" component={SignUp}></Route>
		<Route path="/cart" component={Cart}></Route>
		<Route path="/account" component={Account}></Route>
		<Route path="/about" component={About}></Route>
		<Route path="/resetpassword/:token" component={ResetPassword} />
		<Route path="/ordercomplete" component={OrderComplete}></Route>
		<Route path="/*" component={NotFound}></Route>
	</main>
	<footer>
		<Link to="/about">About Us</Link>
		<p>GreenGarden™</p>
	</footer>
</Router>

<style>
	.logo {
		flex-basis: 40%;
	}

	.account {
		display: flex;
		gap: 35px;
		flex-basis: 40%;
		justify-content: flex-end;
	}

	main {
		flex: 1;
	}
	nav {
		display: flex;
		justify-content: space-between;
		background-color: rgb(255, 255, 255);
		border-bottom: 1px solid rgb(189, 189, 189);
		padding: 15px 35px 15px 35px;
		font-weight: 300;
    	font-size: 1.2em;
	}

	footer {
		display: flex;
    	padding: 5px 0px;
    	position: relative;
    	bottom: 0;
    	height: 35px;
    	background: rgb(255, 255, 255);
		border-top: 1px solid rgb(189, 189, 189);
    	justify-content: space-between;
    	align-items: center;
		padding: 5px 35px 5px 35px;
	}
</style>