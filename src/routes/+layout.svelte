<script lang="ts">
	import { resolve } from '$app/paths';
	import { page } from '$app/state';
	import { dev } from '$app/environment';
	import { env } from '$env/dynamic/public';
	import { onMount } from 'svelte';
	import '../app.css';
	import favicon from '$lib/assets/favicon.svg';
	import Footer from '$lib/components/Footer.svelte';
	import Header from '$lib/components/Header.svelte';
	import ServiceModal from '$lib/components/ServiceModal.svelte';

	const homePath = resolve('/').replace(/\/$/, '') || '/';
	let { children } = $props();
	let SvelteDevKit = $state<typeof import('svelte-grab').SvelteDevKit>();
	let enableSvelteGrabMcp = $state(false);
	let servicesOpen = $state(false);
	let isHome = $derived(
		page.route.id === '/' || (page.url.pathname.replace(/\/$/, '') || '/') === homePath
	);
	let themeColor = $derived(isHome ? '#0070f3' : '#ffffff');
	onMount(() => {
		if (import.meta.env.DEV) {
			enableSvelteGrabMcp =
				env.PUBLIC_ENABLE_SVELTE_GRAB_MCP === 'true' &&
				['localhost', '127.0.0.1', '::1'].includes(location.hostname);

			void import('svelte-grab')
				.then((module) => {
					SvelteDevKit = module.SvelteDevKit;
				})
				.catch((error) => {
					console.warn('Failed to load svelte-grab', error);
				});
		}
	});
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
	<meta name="theme-color" content={themeColor} />
</svelte:head>

<Header onServices={() => (servicesOpen = true)} />
<main>{@render children()}</main>
<Footer />
<ServiceModal bind:open={servicesOpen} />
{#if dev && SvelteDevKit}
	<SvelteDevKit enableMcp={enableSvelteGrabMcp} />
{/if}
