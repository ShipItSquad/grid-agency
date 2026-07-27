<script lang="ts">
	import '../app.css';
	import favicon from '$lib/assets/favicon.svg';
	import Footer from '$lib/components/Footer.svelte';
	import Header from '$lib/components/Header.svelte';
	import ServiceModal from '$lib/components/ServiceModal.svelte';

	let { children } = $props();
	let servicesOpen = $state(false);
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
	<meta name="theme-color" content="#f2f0e9" />
</svelte:head>

<Header onServices={() => (servicesOpen = true)} />
<main>{@render children()}</main>
<Footer />
<ServiceModal bind:open={servicesOpen} />
