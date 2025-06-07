<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import { browser } from '$app/environment';

	let {
		src,
		alt = 'Avatar',
		class: className = ''
	}: {
		src: string;
		alt?: string;
		class?: string;
	} = $props();

	let isDvdBouncing = $state(false);
	let avatarElement = $state<HTMLButtonElement>();
	let animationFrame = $state<number>();

	// DVD bouncing state
	let position = $state({ x: 100, y: 100 });
	let velocity = $state({ x: 2, y: 1.5 });
	let hue = $state(0);
	let avatarSize = $state({ width: 56, height: 56 }); // Default md size

	function startDvdBounce() {
		if (!browser || !avatarElement) return;
		
		isDvdBouncing = true;
		
		// Get current avatar size
		const rect = avatarElement.getBoundingClientRect();
		avatarSize = { width: rect.width, height: rect.height };
		
		// Set initial position (start from center of screen)
		position = { 
			x: window.innerWidth / 2 - avatarSize.width / 2, 
			y: window.innerHeight / 2 - avatarSize.height / 2 
		};
		
		// Make avatar fixed positioned from top-left (0,0)
		avatarElement.style.position = 'fixed';
		avatarElement.style.top = '0';
		avatarElement.style.left = '0';
		avatarElement.style.zIndex = '9999';
		
		animate();
	}

	function stopDvdBounce() {
		if (animationFrame) {
			cancelAnimationFrame(animationFrame);
		}
		isDvdBouncing = false;
		
		if (avatarElement) {
			// Reset avatar styles
			avatarElement.style.position = '';
			avatarElement.style.top = '';
			avatarElement.style.left = '';
			avatarElement.style.zIndex = '';
			avatarElement.style.transform = '';
			avatarElement.style.filter = '';
		}
	}

	function animate() {
		if (!browser || !isDvdBouncing) return;
		
		// Get viewport dimensions
		const viewportWidth = window.innerWidth;
		const viewportHeight = window.innerHeight;
		
		// Check boundaries BEFORE moving and bounce if needed
		if (position.x + velocity.x <= 0 || position.x + velocity.x >= viewportWidth - avatarSize.width) {
			velocity.x = -velocity.x;
			hue = (hue + 60) % 360; // Change color on bounce
		}
		
		if (position.y + velocity.y <= 0 || position.y + velocity.y >= viewportHeight - avatarSize.height) {
			velocity.y = -velocity.y;
			hue = (hue + 60) % 360; // Change color on bounce
		}
		
		// Update position after bounce check
		position.x += velocity.x;
		position.y += velocity.y;
		
		// Clamp position to stay within bounds (safety net)
		position.x = Math.max(0, Math.min(viewportWidth - avatarSize.width, position.x));
		position.y = Math.max(0, Math.min(viewportHeight - avatarSize.height, position.y));
		
		// Apply transform and color
		if (avatarElement) {
			avatarElement.style.transform = `translate(${position.x}px, ${position.y}px)`;
			avatarElement.style.filter = `hue-rotate(${hue}deg)`;
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
	class="h-10 w-10 rounded-full border-2 border-gray-100 shadow-lg hover:cursor-pointer transition-all duration-300 md:h-14 md:w-14 {isDvdBouncing ? '' : 'hover:animate-spin hover:shadow-xl hover:scale-110'} bg-cover bg-center bg-no-repeat p-0 {className}"
	style="background-image: url({src})"
	aria-label="{alt} - click to activate DVD bouncing mode"
	onclick={toggleDvdBounce}
	onkeydown={handleKeydown}
></button>