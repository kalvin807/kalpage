<script>
	import '../app.css';
	let { children } = $props();
	import Header from '../components/header.svelte';
	import Footer from '../components/footer.svelte';
</script>

<Header />
<main class="min-h-screen flex flex-col content-center items-center px-4 py-8">
	{@render children()}
</main>
<Footer />
