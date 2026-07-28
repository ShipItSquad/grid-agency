<script lang="ts">
	import type { Project } from '$lib/data';

	let { project, index = 0 }: { project: Project; index?: number } = $props();
	let artColor = $derived(/^#[\da-f]{6}$/i.test(project.artColor) ? project.artColor : '#000000');
</script>

<div class="visual {project.shape}" style={`--project-color: ${artColor}`} aria-hidden="true">
	{#if project.shape === 'orbit'}
		<div class="planet"></div>
		<div class="ring"></div>
		<span>OG—{index + 1}</span>
	{:else if project.shape === 'wave'}
		<div class="wave-line"></div>
		<div class="wave-line second"></div>
		<span>AFTER<br />HOURS</span>
	{:else if project.shape === 'grid'}
		<div class="grid-mark">+</div>
		<div class="grid-mark last">+</div>
		<span>FIELD<br />STUDY</span>
	{:else}
		<span class="giant-type">Aa</span><i>New forms<br />for old ideas</i>
	{/if}
</div>

<style>
	.visual {
		position: relative;
		min-height: clamp(260px, 40vw, 590px);
		overflow: hidden;
		background: var(--project-color);
	}

	.orbit .planet {
		position: absolute;
		top: 50%;
		left: 50%;
		width: 30%;
		aspect-ratio: 1;
		border-radius: 50%;
		background: var(--paper);
		transform: translate(-50%, -50%);
	}

	.orbit .ring {
		position: absolute;
		top: 50%;
		left: 50%;
		width: 65%;
		height: 18%;
		border: 2px solid var(--ink);
		border-radius: 50%;
		transform: translate(-50%, -50%) rotate(-18deg);
	}

	.orbit span {
		position: absolute;
		top: 1.2rem;
		left: 1.2rem;
		font-size: 0.65rem;
		font-weight: 800;
	}

	.wave {
		background: var(--ink);
	}

	.wave-line {
		position: absolute;
		top: 25%;
		left: -10%;
		width: 120%;
		height: 45%;
		border: clamp(24px, 5vw, 70px) solid var(--project-color);
		border-right-color: transparent;
		border-left-color: transparent;
		border-radius: 50%;
		transform: rotate(-8deg);
	}

	.wave-line.second {
		transform: rotate(18deg);
	}

	.wave span {
		position: absolute;
		right: 1.5rem;
		bottom: 1.2rem;
		color: var(--paper);
		font-size: clamp(2rem, 5vw, 5rem);
		font-weight: 900;
		line-height: 0.78;
		letter-spacing: -0.08em;
		text-align: right;
	}

	.grid {
		background-color: var(--project-color);
		background-image:
			linear-gradient(var(--ink) 1px, transparent 1px),
			linear-gradient(90deg, var(--ink) 1px, transparent 1px);
		background-size: 12.5% 12.5%;
	}

	.grid span {
		position: absolute;
		top: 50%;
		left: 50%;
		padding: 0.2em;
		background: var(--project-color);
		font-size: clamp(2.6rem, 7vw, 7rem);
		font-weight: 900;
		line-height: 0.75;
		letter-spacing: -0.1em;
		transform: translate(-50%, -50%) rotate(-4deg);
	}

	.grid-mark {
		position: absolute;
		top: 1rem;
		left: 1rem;
		font-size: 2rem;
	}

	.grid-mark.last {
		top: auto;
		right: 1rem;
		bottom: 1rem;
		left: auto;
	}

	.type {
		display: grid;
		place-items: center;
	}

	.giant-type {
		font-family: var(--display);
		font-size: clamp(8rem, 30vw, 28rem);
		line-height: 0.7;
		letter-spacing: -0.13em;
	}

	.type i {
		position: absolute;
		right: 1rem;
		bottom: 1rem;
		font-size: 0.65rem;
		font-style: normal;
		font-weight: 800;
		text-transform: uppercase;
	}
</style>
