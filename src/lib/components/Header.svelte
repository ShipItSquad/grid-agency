<script lang="ts">
	import { resolve } from '$app/paths';
	import { page } from '$app/state';
	import type { RouteId } from '$app/types';

	let { onServices }: { onServices: () => void } = $props();
	let menuOpen = $state(false);

	const links: { href: RouteId; label: string }[] = [
		{ href: '/playgrounds', label: 'Playgrounds' },
		{ href: '/blog', label: 'Journal' },
		{ href: '/about', label: 'Studio' }
	];

	function isActive(href: string) {
		return page.url.pathname.startsWith(resolve(href as RouteId));
	}
</script>

<header class:menu-open={menuOpen}>
	<a class="brand" href={resolve('/')} aria-label="Off Grid home">OFF<span>/</span>GRID</a>
	<nav aria-label="Main navigation">
		{#each links as link (link.href)}
			<a
				class:active={isActive(link.href)}
				href={resolve(link.href)}
				onclick={() => (menuOpen = false)}
			>
				{link.label}
			</a>
		{/each}
		<button
			class="services-link"
			type="button"
			aria-haspopup="dialog"
			aria-controls="services-dialog"
			onclick={() => {
				onServices();
				menuOpen = false;
			}}
		>
			Services
		</button>
	</nav>
	<button
		class="menu-button"
		type="button"
		aria-label="Toggle navigation"
		aria-expanded={menuOpen}
		onclick={() => (menuOpen = !menuOpen)}
	>
		<span></span><span></span>
	</button>
</header>

<style>
	header {
		position: relative;
		z-index: 20;
		display: flex;
		align-items: center;
		justify-content: space-between;
		min-height: 5.25rem;
		padding: 0 var(--page-pad);
		border-bottom: 1px solid var(--line);
		background: var(--paper);
	}

	.brand {
		font-size: 1.25rem;
		font-weight: 900;
		letter-spacing: -0.08em;
	}

	.brand span {
		color: var(--blue);
	}

	nav {
		display: flex;
		align-items: center;
		gap: clamp(1.25rem, 3vw, 3.5rem);
		font-size: 0.76rem;
		font-weight: 700;
		letter-spacing: 0.08em;
		text-transform: uppercase;
	}

	nav a,
	.services-link {
		position: relative;
	}

	nav a::after {
		position: absolute;
		bottom: -0.5rem;
		left: 0;
		width: 100%;
		height: 2px;
		background: var(--ink);
		content: '';
		transform: scaleX(0);
		transform-origin: right;
		transition: transform 180ms ease;
	}

	nav a:hover::after,
	nav a:focus-visible::after,
	nav a.active::after {
		transform: scaleX(1);
		transform-origin: left;
	}

	.services-link:focus-visible,
	.menu-button:focus-visible {
		outline: 2px solid var(--blue);
		outline-offset: 3px;
	}

	.services-link {
		padding: 0.8rem 1.1rem;
		border: 1px solid var(--ink);
		border-radius: 999px;
		font: inherit;
		text-transform: inherit;
		transition:
			background 180ms ease,
			color 180ms ease;
	}

	.services-link:hover {
		background: var(--ink);
		color: var(--paper);
	}

	.menu-button {
		display: none;
	}

	@media (max-width: 720px) {
		header {
			min-height: 4.5rem;
		}

		nav {
			position: absolute;
			top: 100%;
			left: 0;
			display: none;
			width: 100%;
			padding: 2rem var(--page-pad) 2.5rem;
			align-items: flex-start;
			background: var(--paper);
			border-bottom: 1px solid var(--ink);
			font-size: 1.5rem;
			letter-spacing: -0.03em;
			text-transform: none;
		}

		.menu-open nav {
			display: flex;
			flex-direction: column;
		}

		.menu-button {
			display: grid;
			width: 2.75rem;
			height: 2.75rem;
			place-content: center;
			gap: 0.35rem;
		}

		.menu-button span {
			display: block;
			width: 1.4rem;
			height: 1px;
			background: currentColor;
			transition: transform 180ms ease;
		}

		.menu-open .menu-button span:first-child {
			transform: translateY(0.2rem) rotate(45deg);
		}

		.menu-open .menu-button span:last-child {
			transform: translateY(-0.2rem) rotate(-45deg);
		}
	}
</style>
