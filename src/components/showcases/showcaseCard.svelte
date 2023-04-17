<script lang="ts">
	import { Code2 as Code, Globe2 } from 'lucide-svelte';

	export let title: string,
		description: string,
		github: string = '',
		web: string = '',
		gradient: string;
</script>

<div
	class={`h-full w-full transform rounded-xl p-1 transition-all hover:scale-[1.01] hover:text-white focus:outline-none focus:ring active:text-opacity-75 ${gradient}`}
>
	<div
		class="relative flex h-full w-full flex-col gap-2 rounded-lg bg-slate-900 px-5 py-6 text-sm hover:bg-slate-900/80"
	>
		<div class="flex flex-col gap-1">
			<h3 class="text-md font-bold md:text-lg">{title}</h3>
			<p>{description}</p>
		</div>
		<div class="flex flex-row justify-end gap-4">
			{#if github}
				<a href={github} target="_blank" rel="noopener noreferrer">
					<button class="z-10 rounded p-2 transition-all hover:bg-white/20">
						<Code class="h-5 w-5" />
					</button>
				</a>
			{/if}
			{#if web}
				<a href={web} target="_blank" rel="noopener noreferrer">
					<button class="z-10 rounded p-2 transition-all hover:bg-white/20">
						<Globe2 class="h-5 w-5" />
					</button>
				</a>
			{/if}
		</div>
	</div>
</div>
