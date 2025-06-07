<script lang="ts">
	import doggo from '$lib/assets/doggo.png';
	import Experiences from '../components/experiences/experiences.svelte';
	import Showcases from '../components/showcases/showcases.svelte';
	import DvdBouncingAvatar from '../components/dvdBouncingAvatar.svelte';
</script>

<div class="w-full max-w-4xl flex flex-col gap-16 text-white">
	<!-- Hero Section -->
	<section class="flex flex-col gap-8">
		<div class="flex flex-row items-center gap-3">
			<DvdBouncingAvatar src={doggo} alt="doggo spinning disk" />
			<h1 class="text-5xl font-bold tracking-tight md:text-6xl text-white relative">
				<span class="inline-block overflow-hidden whitespace-nowrap border-r-2 border-white w-0 animate-typewriter animate-cursor-blink">
					Hello There.
				</span>
			</h1>
		</div>
		<p class="text-lg md:text-xl text-gray-200 leading-relaxed max-w-3xl">
			I am Kal.L 👋. Currently a Software engineer in Tokyo, Japan. Welcome to my page. I update
			here to show my recent works and thoughts from time to time. I hope you enjoy it.
		</p>
	</section>

	<!-- Projects Section -->
	<section class="flex flex-col gap-8">
		<h2 class="text-3xl font-bold tracking-tight md:text-4xl border-b border-gray-700 pb-4 hover:border-gray-500 transition-colors duration-300">
			Stuff I made.
		</h2>
		<Showcases />
	</section>

	<!-- Experience Section -->
	<section class="flex flex-col gap-8">
		<h2 class="text-3xl font-bold tracking-tight md:text-4xl border-b border-gray-700 pb-4 hover:border-gray-500 transition-colors duration-300">
			Things that happened.
		</h2>
		<div class="mx-auto w-full max-w-3xl">
			<Experiences />
		</div>
	</section>
</div>
