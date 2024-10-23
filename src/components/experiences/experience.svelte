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

<li class="mb-4 ml-2">
	<div class="text-info mb-2 flex items-center">
		<span class="sr-only">Check</span>
		<ChevronRight class="h-5 w-5" />
		<p class="font-mono">{title}</p>
	</div>
	<p class="ml-7 text-sm">{description}</p>
</li>
