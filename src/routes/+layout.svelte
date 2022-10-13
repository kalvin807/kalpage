<script>
	import '../app.css';
	import Header from '../components/header.svelte';
	import Footer from '../components/footer.svelte';
</script>

<Header />
<div class=" flex flex-col content-center items-center gap-1">
	<slot />
</div>
<Footer />
