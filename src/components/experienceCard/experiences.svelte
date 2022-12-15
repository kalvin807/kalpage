<script lang="ts">
	import data from './data';
	import Experience from './experience.svelte';
	interface Event {
		title: string;
		description: string;
	}
</script>

{#each data as d}
	<h3 class="mb-4 text-lg font-bold tracking-tight md:text-xl">{d.year}</h3>
	<ul>
		{#each d.events as event}
			<Experience title={event.title} description={event.description} />
		{/each}
	</ul>
{/each}
