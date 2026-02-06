<script lang="ts">
	import data from './data';
	import Experience from './experience.svelte';
</script>

<div class="relative">
	<!-- Subtle timeline line -->
	<div class="absolute left-2 top-0 bottom-0 w-px bg-gray-500 opacity-50"></div>
	
	{#each data as d}
		<div class="relative mb-8">
			<div class="flex items-center mb-4">
				<!-- Simple dot -->
				<div class="w-2 h-2 rounded-full bg-gray-300 mr-4 relative z-10"></div>
				<h3 class="text-lg font-bold tracking-tight md:text-xl">{d.year}</h3>
			</div>
			<ul class="ml-6">
				{#each d.events as event}
					<Experience title={event.title} description={event.description} />
				{/each}
			</ul>
		</div>
	{/each}
</div>
