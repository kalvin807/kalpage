<script lang="ts">
	import ShowcaseCard from './showcaseCard.svelte';

	const projects = [
		{
			title: 'GBFinder Omega - グラブル救援検索・マグナ',
			description: 'Granblue Fantasy raid finder written in Go and React',
			github: 'https://github.com/kalvin807/gbf-raid-finder',
			web: 'https://gbf.kalvin.io',
			gradient: 'bg-linear-to-b from-sky-400/40 to-sky-300/20'
		},
		{
			title: 'henkaku',
			description: 'JS library to convert string between full-width and half-width',
			github: 'https://github.com/kalvin807/henkaku',
			gradient: 'bg-linear-to-br from-indigo-400/40 to-purple-400/20'
		},
		{
			title: 'guru-pu',
			description: 'Discord bot to auto-assign roles',
			github: 'https://github.com/kalvin807/guru-pu',
			gradient: 'bg-linear-to-r from-teal-400/40 to-lime-400/20'
		},
		{
			title: 'akaina',
			description: 'ML model to count the number of Magikarp in a youtube live stream',
			github: 'https://github.com/kalvin807/akaina-detector',
			gradient: 'bg-linear-to-br from-rose-400/40 to-pink-400/20'
		}
	];
</script>

<div id="cards" class="grid grid-cols-1 gap-2 md:grid-cols-2 md:gap-4">
	{#each projects as project}
		<ShowcaseCard
			title={project.title}
			description={project.description}
			github={project.github}
			web={project.web}
			gradient={project.gradient}
		/>
	{/each}
</div>
