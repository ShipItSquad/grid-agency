<script lang="ts">
	import { page } from '$app/state';
	import '../app.css';
	import favicon from '$lib/assets/favicon.svg';
	import Footer from '$lib/components/Footer.svelte';
	import Header from '$lib/components/Header.svelte';
	import ServiceModal from '$lib/components/ServiceModal.svelte';

	let { children } = $props();
	let servicesOpen = $state(false);
	let themeColor = $derived(page.route.id === '/' ? '#0070f3' : '#ffffff');
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
	<meta name="theme-color" content={themeColor} />
</svelte:head>

<Header onServices={() => (servicesOpen = true)} />
<main>{@render children()}</main>
<Footer />
<ServiceModal bind:open={servicesOpen} />
