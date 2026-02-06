<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import { browser } from '$app/environment';
	import colors from 'tailwindcss/colors';

	let {
		src,
		webpSrc,
		alt = 'Avatar',
		class: className = ''
	}: {
		src: string;
		webpSrc?: string;
		alt?: string;
		class?: string;
	} = $props();

	let isDvdBouncing = $state(false);
	let avatarElement = $state<HTMLButtonElement>();
	let animationFrame = $state<number | undefined>();

	// DVD bouncing state
	const SPEED = 3;
	let position = $state({ x: 0, y: 0 });
	let velocity = $state({ x: 0, y: 0 });
	let currentColor = $state('');
	let avatarSize = $state({ width: 56, height: 56 }); // Default md size

	// Predefined colors for random selection from Tailwind's palette
	const tailwindColors = [
		colors.red[500],
		colors.orange[500],
		colors.amber[500],
		colors.yellow[500],
		colors.lime[500],
		colors.green[500],
		colors.emerald[500],
		colors.teal[500],
		colors.cyan[500],
		colors.sky[500],
		colors.blue[500],
		colors.indigo[500],
		colors.violet[500],
		colors.purple[500],
		colors.fuchsia[500],
		colors.pink[500],
		colors.rose[500]
	];

	function getRandomColor() {
		let newColor;
		do {
			newColor = tailwindColors[Math.floor(Math.random() * tailwindColors.length)];
		} while (newColor === currentColor);
		return newColor;
	}

	function setRandomVelocity() {
		const angle = Math.random() * 2 * Math.PI;
		velocity = {
			x: Math.cos(angle) * SPEED,
			y: Math.sin(angle) * SPEED
		};
	}

	function startDvdBounce() {
		if (!browser || !avatarElement) return;

		isDvdBouncing = true;

		// Get current avatar size
		const rect = avatarElement.getBoundingClientRect();
		avatarSize = { width: rect.width, height: rect.height };

		// Set initial position (start from top-left)
		position = { x: 0, y: 0 };

		// Initialize direction and color
		setRandomVelocity();
		currentColor = getRandomColor();

		// Make avatar fixed positioned from top-left (0,0)
		avatarElement.style.position = 'fixed';
		avatarElement.style.top = '0';
		avatarElement.style.left = '0';
		avatarElement.style.zIndex = '9999';
		avatarElement.style.backgroundColor = currentColor;
		avatarElement.style.backgroundBlendMode = 'multiply';

		// Start animation
		animate();
	}

	function stopDvdBounce() {
		if (animationFrame) {
			cancelAnimationFrame(animationFrame);
			animationFrame = undefined;
		}
		isDvdBouncing = false;

		if (avatarElement) {
			// Reset avatar styles
			avatarElement.style.position = '';
			avatarElement.style.top = '';
			avatarElement.style.left = '';
			avatarElement.style.zIndex = '';
			avatarElement.style.transform = '';
			avatarElement.style.backgroundColor = '';
			avatarElement.style.backgroundBlendMode = '';
		}
	}

	function animate() {
		if (!browser || !isDvdBouncing) return;

		const viewportWidth = window.innerWidth;
		const viewportHeight = window.innerHeight;
		let bounced = false;

		const nextX = position.x + velocity.x;
		const nextY = position.y + velocity.y;

		if (nextX <= 0 || nextX >= viewportWidth - avatarSize.width) {
			velocity.x *= -1;
			bounced = true;
		}

		if (nextY <= 0 || nextY >= viewportHeight - avatarSize.height) {
			velocity.y *= -1;
			bounced = true;
		}

		if (bounced) {
			currentColor = getRandomColor();
		}

		position.x += velocity.x;
		position.y += velocity.y;

		// Apply transform and color
		if (avatarElement) {
			avatarElement.style.transform = `translate(${position.x}px, ${position.y}px)`;
			if (bounced) {
				avatarElement.style.backgroundColor = currentColor;
			}
		}

		animationFrame = requestAnimationFrame(animate);
	}

	function toggleDvdBounce() {
		if (isDvdBouncing) {
			stopDvdBounce();
		} else {
			startDvdBounce();
		}
	}

	// Handle window resize
	function handleResize() {
		if (!browser || !isDvdBouncing || !avatarElement) return;

		const viewportWidth = window.innerWidth;
		const viewportHeight = window.innerHeight;

		// Keep avatar within bounds after resize
		position.x = Math.min(position.x, viewportWidth - avatarSize.width);
		position.y = Math.min(position.y, viewportHeight - avatarSize.height);
	}

	// Handle keyboard events for accessibility
	function handleKeydown(event: KeyboardEvent) {
		if (event.key === 'Enter' || event.key === ' ') {
			event.preventDefault();
			toggleDvdBounce();
		}
	}

	onMount(() => {
		if (browser) {
			window.addEventListener('resize', handleResize);
		}
	});

	onDestroy(() => {
		stopDvdBounce();
		if (browser) {
			window.removeEventListener('resize', handleResize);
		}
	});
</script>

<button
	bind:this={avatarElement}
	class="h-10 w-10 rounded-full border-2 border-gray-100 shadow-lg hover:cursor-pointer md:h-14 md:w-14 {isDvdBouncing ? '' : 'transition-all duration-300 hover:animate-spin hover:shadow-xl hover:scale-110'} p-0 overflow-hidden {className}"
	aria-label="{alt} - click to activate DVD bouncing mode"
	onclick={toggleDvdBounce}
	onkeydown={handleKeydown}
>
	<picture>
		{#if webpSrc}
			<source srcset={webpSrc} type="image/webp" />
		{/if}
		<img {src} {alt} class="w-full h-full object-cover" />
	</picture>
</button>