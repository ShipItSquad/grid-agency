<script lang="ts">
	import { resolve } from '$app/paths';
	import { page } from '$app/state';
	import { onMount } from 'svelte';
	import '../app.css';
	import favicon from '$lib/assets/favicon.svg';
	import Footer from '$lib/components/Footer.svelte';
	import Header from '$lib/components/Header.svelte';
	import ServiceModal from '$lib/components/ServiceModal.svelte';

	const homePath = resolve('/').replace(/\/$/, '') || '/';
	let { children } = $props();
	let SvelteDevKit = $state<null | typeof import('svelte-grab').SvelteDevKit>(null);
	let servicesOpen = $state(false);
	let isHome = $derived(
		page.route.id === '/' || (page.url.pathname.replace(/\/$/, '') || '/') === homePath
	);
	let themeColor = $derived(isHome ? '#0070f3' : '#ffffff');

	onMount(() => {
		if (import.meta.env.DEV) {
			void import('svelte-grab').then(({ SvelteDevKit: DevKit }) => {
				SvelteDevKit = DevKit;
			});
		}
	});
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
	<meta name="theme-color" content={themeColor} />
</svelte:head>

<Header {servicesOpen} onServices={() => (servicesOpen = true)} />
<main>{@render children()}</main>
<Footer />
<ServiceModal bind:open={servicesOpen} />
{#if SvelteDevKit}
	<SvelteDevKit enableMcp />
{/if}
