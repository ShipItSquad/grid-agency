<script lang="ts">
	const principles = [
		[
			'Stay close',
			'The people doing the work are always in the room. Less translation, better outcomes.'
		],
		[
			'Make it useful',
			'Expression matters, but it has to do a job. We look for the place where both are true.'
		],
		[
			'Leave a door open',
			'Good identities and products should invite participation, interpretation, and change.'
		]
	];
</script>

<svelte:head>
	<title>Studio — OFF/GRID</title>
	<meta
		name="description"
		content="Meet OFF/GRID, an independent design practice working across identity and digital."
	/>
</svelte:head>

<section class="page-intro studio-intro">
	<h1>Off<br />Grid</h1>
	<div class="intro-copy">
		<p class="eyebrow">Small studio, wide field of view</p>
		<p>
			We are an independent design practice for teams navigating change, complexity, and a blank
			page.
		</p>
	</div>
</section>

<section class="studio-story">
	<p class="eyebrow">The short version</p>
	<div>
		<p class="lead">
			OFF/GRID started with a simple belief: the best work rarely follows the most obvious path.
		</p>
		<div class="columns">
			<p>
				We move between strategy, identity, and digital to build things that are distinct and
				durable. Our structure stays deliberately small, then expands with trusted collaborators
				when the work asks for it.
			</p>
			<p>
				The studio in this demo is fictional. The structure is ready for a real team, client list,
				capabilities, and contact flow when those details are available.
			</p>
		</div>
	</div>
</section>

<section class="principles">
	<p class="eyebrow">How we work</p>
	<div class="principle-list">
		{#each principles as principle, index (principle[0])}
			<article>
				<span>0{index + 1}</span>
				<h2>{principle[0]}</h2>
				<p>{principle[1]}</p>
			</article>
		{/each}
	</div>
</section>

<section class="facts">
	<div><strong>03</strong><span>Core disciplines</span></div>
	<div><strong>01</strong><span>Shared point of view</span></div>
	<div><strong>∞</strong><span>Useful detours</span></div>
</section>

<style>
	.studio-intro {
		background: var(--ink);
		color: var(--paper);
	}

	.studio-story,
	.principles {
		display: grid;
		grid-template-columns: 1fr 3fr;
		gap: 2rem;
		padding: clamp(5rem, 11vw, 10rem) var(--page-pad);
	}

	.lead {
		max-width: 20ch;
		font-family: var(--display);
		font-size: clamp(2.7rem, 6vw, 6rem);
		line-height: 0.94;
		letter-spacing: -0.055em;
	}

	.columns {
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		gap: 2rem;
		max-width: 800px;
		margin-top: 4rem;
		font-size: 0.92rem;
		line-height: 1.6;
	}

	.principles {
		background: var(--blue);
		color: var(--paper);
	}

	.principle-list {
		border-top: 1px solid currentColor;
	}

	.principle-list article {
		display: grid;
		grid-template-columns: 3rem 1fr 1fr;
		gap: 2rem;
		padding: 2rem 0;
		border-bottom: 1px solid currentColor;
	}

	.principle-list span,
	.principle-list p {
		font-size: 0.75rem;
		line-height: 1.5;
	}

	.principle-list h2 {
		font-family: var(--display);
		font-size: clamp(2rem, 4vw, 4rem);
		font-weight: 400;
		line-height: 1;
		letter-spacing: -0.05em;
	}

	.facts {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		padding: var(--page-pad);
		background: var(--acid);
	}

	.facts div {
		display: flex;
		min-height: 22vw;
		padding: 1rem;
		border-right: 1px solid var(--ink);
		flex-direction: column;
		justify-content: space-between;
	}

	.facts div:last-child {
		border: 0;
	}

	.facts strong {
		font-family: var(--display);
		font-size: clamp(4rem, 12vw, 12rem);
		font-weight: 400;
		line-height: 0.8;
		letter-spacing: -0.08em;
	}

	.facts span {
		font-size: 0.68rem;
		font-weight: 700;
		text-transform: uppercase;
	}

	@media (max-width: 720px) {
		.studio-story,
		.principles {
			grid-template-columns: 1fr;
		}

		.columns {
			grid-template-columns: 1fr;
		}

		.principle-list article {
			grid-template-columns: 2rem 1fr;
		}

		.principle-list p {
			grid-column: 2;
		}

		.facts {
			grid-template-columns: 1fr;
		}

		.facts div {
			min-height: 15rem;
			border-right: 0;
			border-bottom: 1px solid var(--ink);
		}
	}
</style>
