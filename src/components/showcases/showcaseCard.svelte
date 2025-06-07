<script lang="ts">
	import { Code, Globe } from '@lucide/svelte';

	let {
		title,
		description,
		github,
		web,
		gradient
	}: {
		title: string;
		description: string;
		github?: string;
		web?: string;
		gradient: string;
	} = $props();
</script>

<div
	class={`h-full w-full rounded-xl p-1 transition-all duration-300 hover:scale-[1.01] focus:outline-hidden ${gradient} group`}
>
	<div
		class="relative flex h-full w-full flex-col gap-2 rounded-lg bg-slate-900 px-5 py-6 text-sm transition-all duration-300 hover:bg-slate-900/80"
	>
		<div class="flex flex-1 flex-col gap-1">
			<h3 class="text-md font-bold md:text-lg transition-colors duration-300 group-hover:text-white">{title}</h3>
			<p class="transition-colors duration-300 group-hover:text-gray-200">{description}</p>
		</div>
		<div class="flex flex-row justify-end gap-4">
			{#if github}
				<a href={github} target="_blank" rel="noopener noreferrer">
					<button class="z-10 rounded-sm p-2 transition-all duration-300 hover:bg-white/20">
						<Code class="h-5 w-5" />
					</button>
				</a>
			{/if}
			{#if web}
				<a href={web} target="_blank" rel="noopener noreferrer">
					<button class="z-10 rounded-sm p-2 transition-all duration-300 hover:bg-white/20">
						<Globe class="h-5 w-5" />
					</button>
				</a>
			{/if}
		</div>
	</div>
</div>
