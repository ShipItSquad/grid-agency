<script lang="ts">
	import { posts } from '$lib/data';
</script>

<svelte:head>
	<title>Journal — OFF/GRID</title>
	<meta
		name="description"
		content="Notes on design, process, digital work, and studio life from OFF/GRID."
	/>
</svelte:head>

<section class="page-intro journal-intro">
	<h1>Jour<br />nal</h1>
	<div class="intro-copy">
		<p class="eyebrow">Observations from the middle</p>
		<p>Working notes on design, technology, culture, and the process of figuring things out.</p>
	</div>
</section>

<section class="posts">
	{#each posts as post, index (post.title)}
		<article>
			<div class="number">{String(index + 1).padStart(2, '0')}</div>
			<div class="post-body">
				<p class="eyebrow">{post.tag} / {post.readTime} read</p>
				<h2>{post.title}</h2>
				<p class="excerpt">{post.excerpt}</p>
			</div>
			<div class="date">{post.date}</div>
			<span class="arrow" aria-hidden="true">↗</span>
		</article>
	{/each}
	<div class="coming-soon">
		<span class="pulse"></span>
		<p>Article pages are being written. This index currently uses mock editorial content.</p>
	</div>
</section>

<style>
	.journal-intro {
		background: var(--acid);
	}

	.posts {
		padding: clamp(4rem, 8vw, 8rem) var(--page-pad) clamp(6rem, 12vw, 11rem);
	}

	.posts article {
		display: grid;
		grid-template-columns: 3rem 1fr auto 2rem;
		gap: 2rem;
		padding: clamp(2rem, 5vw, 4rem) 0;
		border-top: 1px solid var(--ink);
		transition: padding 180ms ease;
	}

	.posts article:hover {
		padding-right: 1rem;
		padding-left: 1rem;
		background: var(--surface);
	}

	.number,
	.date {
		font-size: 0.68rem;
		text-transform: uppercase;
	}

	h2 {
		max-width: 20ch;
		margin: 0.8rem 0 1.25rem;
		font-family: var(--display);
		font-size: clamp(2.5rem, 6vw, 6rem);
		font-weight: 400;
		line-height: 0.88;
		letter-spacing: -0.055em;
	}

	.excerpt {
		max-width: 55ch;
		font-size: 0.9rem;
		line-height: 1.55;
	}

	.arrow {
		font-size: 1.3rem;
	}

	.coming-soon {
		display: flex;
		gap: 0.75rem;
		padding-top: 1.25rem;
		border-top: 1px solid var(--ink);
		align-items: center;
		font-size: 0.68rem;
		font-weight: 700;
		text-transform: uppercase;
	}

	.pulse {
		width: 0.6rem;
		height: 0.6rem;
		border-radius: 50%;
		background: var(--blue);
		box-shadow: 0 0 0 0 rgba(0, 112, 243, 0.4);
		animation: pulse 2s infinite;
	}

	@keyframes pulse {
		70% {
			box-shadow: 0 0 0 8px rgba(0, 112, 243, 0);
		}
		100% {
			box-shadow: 0 0 0 0 rgba(0, 112, 243, 0);
		}
	}

	@media (max-width: 650px) {
		.posts article {
			grid-template-columns: 2rem 1fr 1.5rem;
			gap: 1rem;
		}

		.date {
			grid-column: 2;
		}

		.arrow {
			grid-column: 3;
			grid-row: 1;
		}
	}
</style>
