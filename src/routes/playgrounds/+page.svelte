<script lang="ts">
	import ProjectVisual from '$lib/components/ProjectVisual.svelte';
	import { projects } from '$lib/data';
	let activeFilter = $state('All');
	const filters = ['All', 'Identity', 'Digital', 'Culture', 'Experiment'];
	const visibleProjects = $derived(
		activeFilter === 'All'
			? projects
			: projects.filter((project) =>
					project.category.toLowerCase().includes(activeFilter.toLowerCase())
				)
	);
</script>

<svelte:head>
	<title>Playgrounds — OFF/GRID</title>
	<meta
		name="description"
		content="Selected work, ongoing studies, and experiments from OFF/GRID."
	/>
</svelte:head>

<section class="page-intro">
	<h1>Play<br />grounds</h1>
	<div class="intro-copy">
		<p class="eyebrow">Work, tests, and useful detours</p>
		<p>
			A living index of identities, interfaces, campaigns, and things we made just to see what would
			happen.
		</p>
	</div>
</section>

<section class="work-index">
	<div class="filters" role="group" aria-label="Filter projects">
		{#each filters as filter (filter)}
			<button
				class:active={activeFilter === filter}
				type="button"
				onclick={() => (activeFilter = filter)}
			>
				{filter}
			</button>
		{/each}
	</div>

	<div class="projects">
		{#each visibleProjects as project, index (project.title)}
			<article>
				<ProjectVisual {project} {index} />
				<div class="meta">
					<span>{String(index + 1).padStart(2, '0')}</span>
					<h2>{project.title}</h2>
					<p>{project.category}</p>
					<p>{project.year}</p>
				</div>
			</article>
		{:else}
			<p class="empty">Nothing filed here yet. Try another shelf.</p>
		{/each}
	</div>
</section>

<style>
	.work-index {
		padding: 1.5rem var(--page-pad) clamp(6rem, 12vw, 10rem);
	}

	.filters {
		display: flex;
		gap: 0.5rem;
		padding-bottom: 4rem;
		flex-wrap: wrap;
	}

	.filters button {
		padding: 0.7rem 1rem;
		border: 1px solid var(--line);
		border-radius: 999px;
		font-size: 0.7rem;
		font-weight: 700;
		text-transform: uppercase;
		transition: 160ms ease;
	}

	.filters button:hover,
	.filters button.active {
		border-color: var(--ink);
		background: var(--ink);
		color: var(--paper);
	}

	.projects {
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		gap: clamp(3rem, 8vw, 8rem) 1rem;
	}

	.projects article:nth-child(3n + 1) {
		grid-column: 1 / -1;
	}

	.meta {
		display: grid;
		grid-template-columns: 2rem 1fr auto auto;
		gap: 1.5rem;
		padding-top: 0.8rem;
		align-items: baseline;
	}

	.meta h2 {
		font-size: 1.2rem;
		letter-spacing: -0.04em;
	}

	.meta span,
	.meta p {
		font-size: 0.65rem;
		text-transform: uppercase;
	}

	.empty {
		padding: 5rem 0;
		font-family: var(--display);
		font-size: 2rem;
	}

	@media (max-width: 720px) {
		.projects {
			grid-template-columns: 1fr;
		}

		.projects article:nth-child(3n + 1) {
			grid-column: auto;
		}

		.meta {
			grid-template-columns: 2rem 1fr auto;
		}

		.meta p:first-of-type {
			grid-column: 2;
		}
	}
</style>
