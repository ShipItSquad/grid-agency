<script lang="ts">
	import { resolve } from '$app/paths';
	import { page } from '$app/state';
	import { dev } from '$app/environment';
	import { SvelteDevKit } from 'svelte-grab';
	import { onMount } from 'svelte';
	import '../app.css';
	import favicon from '$lib/assets/favicon.svg';
	import Footer from '$lib/components/Footer.svelte';
	import Header from '$lib/components/Header.svelte';
	import ServiceModal from '$lib/components/ServiceModal.svelte';

	const homePath = resolve('/').replace(/\/$/, '') || '/';
	let { children } = $props();
	let mounted = $state(false);
	let servicesOpen = $state(false);
	let isHome = $derived(
		page.route.id === '/' || (page.url.pathname.replace(/\/$/, '') || '/') === homePath
	);
	let themeColor = $derived(isHome ? '#0070f3' : '#ffffff');

	onMount(() => {
		mounted = true;
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
{#if dev && mounted}
	<SvelteDevKit enableMcp />
{/if}
