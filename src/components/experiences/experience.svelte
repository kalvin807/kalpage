<script lang="ts">
	import { ChevronRight } from 'lucide-svelte';

	let {
		title,
		description
	}: {
		title: string;
		description: string;
	} = $props();
</script>

<li class="mb-4 ml-2 group">
	<div class="text-info mb-2 flex items-center transition-colors duration-300">
		<span class="sr-only">Check</span>
		<ChevronRight class="h-5 w-5 transition-colors duration-300 group-hover:text-blue-400" />
		<p class="font-mono transition-colors duration-300 group-hover:text-white">{title}</p>
	</div>
	<p class="ml-7 text-sm transition-colors duration-300 group-hover:text-gray-200">{description}</p>
</li>
