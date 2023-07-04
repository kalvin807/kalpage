<script>
	import doggo from '$lib/assets/doggo.png';
	import Experiences from '../components/experiences/experiences.svelte';
	import Showcases from '../components/showcases/showcases.svelte';
</script>

<div class="m-2 flex max-w-3xl flex-col gap-10 text-white md:m-0">
	<div class="flex flex-col gap-6">
		<span class="flex flex-row items-center gap-2">
			<img
				alt="doggo spinning disk"
				src={doggo}
				class="h-8 w-8 rounded-full border-2 border-gray-100 shadow-sm hover:animate-spin hover:cursor-progress md:h-11 md:w-11"
			/>
			<h1 class="text-4xl font-bold md:text-5xl">Hello There.</h1>
		</span>
		<p class="text-sm md:text-base">
			I am Kal.L 👋. Currently a Software engineer in Tokyo, Japan. Welcome to my page. I update
			here to show my recent works and thoughts from time to time. I hope you enjoy it.
		</p>
	</div>

	<div class="flex flex-col gap-6">
		<h2 class="text-2xl font-bold md:text-3xl">Stuff I made.</h2>
		<Showcases />
	</div>

	<div class="flex flex-col gap-6">
		<h2 class="text-2xl font-bold md:text-3xl">Things that happened.</h2>
		<div class="mx-auto max-w-2xl">
			<Experiences />
		</div>
	</div>
</div>
