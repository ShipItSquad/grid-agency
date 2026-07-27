<script lang="ts">
	import { resolve } from '$app/paths';
	import ProjectVisual from '$lib/components/ProjectVisual.svelte';
	import { posts, projects } from '$lib/data';
</script>

<svelte:head>
	<title>OFF/GRID — Independent design practice</title>
	<meta
		name="description"
		content="OFF/GRID is an independent design practice building identities, digital experiences, and campaign worlds."
	/>
</svelte:head>

<section class="hero">
	<div class="hero-meta">
		<p class="eyebrow">Independent design practice / 2026</p>
		<p>Strategy, identity, and digital<br />for people making a difference.</p>
	</div>
	<h1>We make ideas<br /><em>move.</em></h1>
	<div class="hero-orbit" aria-hidden="true"><span></span><i>Think / Make / Move / Repeat</i></div>
</section>

<section class="manifesto">
	<p class="eyebrow">A studio for the beautifully unresolved</p>
	<p class="statement">
		We help ambitious teams find their edge, then turn it into <em>something people can feel.</em>
	</p>
	<p class="aside">
		Small by design. Curious by default. Working with people across culture, technology, and the
		public realm.
	</p>
</section>

<section class="selected">
	<div class="section-head">
		<p class="eyebrow">Selected work</p>
		<a href={resolve('/playgrounds')}>View all projects ↗</a>
	</div>
	<div class="project-grid">
		{#each projects.slice(0, 4) as project, index (project.title)}
			<article class:wide={index === 0 || index === 3}>
				<ProjectVisual {project} {index} />
				<div class="project-meta">
					<h2>{project.title}</h2>
					<p>{project.category}</p>
					<span>{project.year}</span>
				</div>
			</article>
		{/each}
	</div>
</section>

<section class="journal">
	<div class="section-head">
		<p class="eyebrow">From the journal</p>
		<a href={resolve('/blog')}>Read all notes ↗</a>
	</div>
	<div class="post-list">
		{#each posts.slice(0, 2) as post, index (post.title)}
			<article>
				<span>0{index + 1}</span>
				<div>
					<p class="eyebrow">{post.tag} / {post.readTime}</p>
					<h2>{post.title}</h2>
				</div>
				<p>{post.date}</p>
			</article>
		{/each}
	</div>
</section>

<style>
	.hero {
		position: relative;
		min-height: calc(100svh - 5.25rem);
		padding: clamp(2rem, 6vw, 5rem) var(--page-pad);
		overflow: hidden;
		background: var(--blue);
		color: var(--paper);
	}

	.hero-meta {
		display: flex;
		justify-content: space-between;
		gap: 2rem;
		font-size: 0.82rem;
		line-height: 1.45;
	}

	.hero h1 {
		position: relative;
		z-index: 2;
		margin-top: clamp(6rem, 17vh, 12rem);
		font-size: clamp(4.4rem, 13vw, 13rem);
		font-weight: 700;
		line-height: 0.74;
		letter-spacing: -0.095em;
	}

	.hero h1 em {
		font-family: var(--display);
		font-weight: 400;
	}

	.hero-orbit {
		position: absolute;
		right: -8vw;
		bottom: -17vw;
		width: min(52vw, 700px);
		aspect-ratio: 1;
		border: 1px solid rgba(255, 255, 255, 0.7);
		border-radius: 50%;
		animation: rotate 24s linear infinite;
	}

	.hero-orbit span {
		position: absolute;
		top: 6%;
		left: 50%;
		width: 9%;
		aspect-ratio: 1;
		border-radius: 50%;
		background: var(--acid);
	}

	.hero-orbit i {
		position: absolute;
		top: 48%;
		left: -3rem;
		font-size: 0.65rem;
		font-style: normal;
		font-weight: 700;
		letter-spacing: 0.1em;
		text-transform: uppercase;
	}

	@keyframes rotate {
		to {
			transform: rotate(360deg);
		}
	}

	.manifesto {
		display: grid;
		grid-template-columns: 1fr 3fr;
		gap: 2rem;
		padding: clamp(5rem, 12vw, 11rem) var(--page-pad);
	}

	.statement {
		max-width: 20ch;
		font-size: clamp(2.5rem, 6.4vw, 6.5rem);
		line-height: 0.98;
		letter-spacing: -0.065em;
	}

	.statement em {
		font-family: var(--display);
		font-weight: 400;
	}

	.aside {
		grid-column: 2;
		max-width: 50ch;
		margin-top: 2rem;
		font-size: 1rem;
		line-height: 1.5;
	}

	.selected,
	.journal {
		padding: 0 var(--page-pad) clamp(6rem, 12vw, 11rem);
	}

	.section-head {
		display: flex;
		justify-content: space-between;
		padding: 1.2rem 0;
		border-top: 1px solid var(--ink);
		font-size: 0.75rem;
		font-weight: 700;
		text-transform: uppercase;
	}

	.project-grid {
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		gap: 4rem 1rem;
	}

	.project-grid article.wide {
		grid-column: 1 / -1;
	}

	.project-meta {
		display: grid;
		grid-template-columns: 1fr auto auto;
		gap: 1.5rem;
		padding-top: 0.8rem;
		align-items: baseline;
	}

	.project-meta h2 {
		font-size: 1.25rem;
		letter-spacing: -0.04em;
	}

	.project-meta p,
	.project-meta span {
		font-size: 0.68rem;
		text-transform: uppercase;
	}

	.post-list {
		border-bottom: 1px solid var(--ink);
	}

	.post-list article {
		display: grid;
		grid-template-columns: 3rem 1fr auto;
		gap: 2rem;
		padding: 2.25rem 0;
		border-top: 1px solid var(--line);
	}

	.post-list h2 {
		max-width: 25ch;
		margin-top: 0.7rem;
		font-family: var(--display);
		font-size: clamp(2rem, 4.5vw, 4.5rem);
		font-weight: 400;
		line-height: 0.95;
		letter-spacing: -0.05em;
	}

	.post-list article > p,
	.post-list article > span {
		font-size: 0.7rem;
	}

	@media (max-width: 720px) {
		.hero-meta {
			flex-direction: column;
		}

		.hero-orbit {
			width: 90vw;
		}

		.manifesto {
			grid-template-columns: 1fr;
		}

		.statement,
		.aside {
			grid-column: 1;
		}

		.project-grid {
			grid-template-columns: 1fr;
		}

		.project-grid article.wide {
			grid-column: auto;
		}

		.post-list article {
			grid-template-columns: 2rem 1fr;
		}

		.post-list article > p {
			grid-column: 2;
		}
	}
</style>
