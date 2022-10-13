<script>
	import doggo from '$lib/assets/doggo.png';
	import Experiences from '../components/experienceCard/experiences.svelte';
	import ShowcaseCard from '../components/showcaseCard.svelte';

	const projects = [
		{
			title: 'GBFinder Omega - グラブル救援検索・マグナ',
			description: 'Granblue Fantasy raid finder written in Go and React',
			github: 'https://github.com/kalvin807/gbf-raid-finder',
			web: 'https://gbf.kalvin.io',
			gradient: 'bg-gradient-to-b from-sky-400 to-sky-200'
		},
		{
			title: 'henkaku',
			description: 'JS library to convert string between full-width and half-width',
			github: 'https://github.com/kalvin807/henkaku',
			gradient: 'bg-gradient-to-br from-indigo-300 to-purple-400'
		},
		{
			title: 'guru-pu',
			description: 'Discord bot to auto-assign roles',
			github: 'https://github.com/kalvin807/guru-pu',
			gradient: 'bg-gradient-to-r from-teal-200 to-lime-200'
		},
		{
			title: 'akaina',
			description: 'ML model to count the number of Magikarp in a youtube live stream',
			github: 'https://github.com/kalvin807/akaina-detector',
			gradient: 'bg-gradient-to-br from-rose-700 to-pink-600'
		}
	];
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
		<h2 class="text-sm md:text-base">
			I am Kal.L 👋 from Hong Kong. Currently a Software engineer in Tokyo, Japan. Geekly boy who
			like to learn cool technology and build things. Also love board game, video games, anime,
			crypto. Recently really into the coffee and tasting different beans. Welcome to my page!
		</h2>
	</div>

	<div class="flex flex-col gap-6">
		<h1 class="text-3xl font-bold md:text-4xl">Some stuff I made.</h1>
		<div class="grid grid-cols-1 gap-2 md:grid-cols-2 md:gap-4">
			{#each projects as project}
				<div class="flex-initial">
					<ShowcaseCard {...project} />
				</div>
			{/each}
		</div>
	</div>

	<div class="flex flex-col gap-6">
		<h1 class="text-3xl font-bold md:text-4xl">Things that happened.</h1>
		<div class="mx-auto max-w-2xl">
			<Experiences />
		</div>
	</div>
</div>
