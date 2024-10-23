<script>
	import { Github, Mail } from 'lucide-svelte';
</script>

<div
	class="supports-backdrop-blur:bg-white/95 sticky top-0 z-40 w-full flex-none bg-white backdrop-blur transition-colors duration-500 dark:border-slate-50/[0.06] dark:bg-slate-900/75 lg:z-50"
>
	<div class="mx-4 py-4 text-white lg:mx-0 lg:px-8">
		<div class="relative flex items-center justify-end gap-2">
			<a href="https://github.com/kalvin807">
				<button class="rounded p-3 transition-all hover:bg-purple-500 hover:text-white">
					<Github class="hover:animate-wiggle" />
				</button>
			</a>
			<a href="mailto:6q4zz1i46@relay.firefox.com">
				<button class="rounded p-3 transition-all hover:bg-red-600 hover:text-white">
					<Mail class="hover:animate-wiggle" />
				</button>
			</a>
		</div>
	</div>
</div>
