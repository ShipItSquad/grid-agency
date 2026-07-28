<script lang="ts">
	import { resolve } from '$app/paths';
</script>

<footer>
	<div class="footer-lead">
		<p class="eyebrow">Start somewhere interesting</p>
		<a href="mailto:hello@offgrid.studio">hello@offgrid.studio <span aria-hidden="true">↗</span></a>
	</div>
	<div class="footer-meta">
		<a class="brand" href={resolve('/')}>OFF/GRID</a>
		<p>Independent design practice<br />working everywhere.</p>
		<p>Instagram<br />Are.na<br />LinkedIn</p>
		<p>© {new Date().getFullYear()}<br />Made with Svelte</p>
	</div>
</footer>

<style>
	footer {
		padding: clamp(3rem, 8vw, 7rem) var(--page-pad) 2rem;
		background: var(--ink);
		color: var(--paper);
	}

	.footer-lead {
		padding-bottom: clamp(4rem, 10vw, 8rem);
	}

	.footer-lead a {
		display: flex;
		justify-content: space-between;
		margin-top: 1.2rem;
		border-bottom: 1px solid currentColor;
		font-family: var(--display);
		font-size: clamp(2.2rem, 7.5vw, 7rem);
		line-height: 1;
		letter-spacing: -0.06em;
	}

	.footer-lead span {
		font-family: var(--sans);
		font-size: 0.5em;
	}

	.footer-meta {
		display: grid;
		grid-template-columns: 2fr 1fr 1fr 1fr;
		gap: 2rem;
		padding-top: 1.5rem;
		border-top: 1px solid var(--line-on-dark);
		font-size: 0.7rem;
		line-height: 1.6;
		text-transform: uppercase;
	}

	.brand {
		font-size: 1.2rem;
		font-weight: 900;
		letter-spacing: -0.08em;
	}

	@media (max-width: 650px) {
		.footer-meta {
			grid-template-columns: 1fr 1fr;
		}
	}
</style>
