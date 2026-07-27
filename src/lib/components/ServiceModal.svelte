<script lang="ts">
	import { services } from '$lib/data';

	let { open = $bindable(false) }: { open: boolean } = $props();
	let dialog: HTMLDialogElement;

	$effect(() => {
		if (!dialog) return;
		if (open && !dialog.open) dialog.showModal();
		if (!open && dialog.open) dialog.close();
	});

	function close() {
		open = false;
	}
</script>

<dialog bind:this={dialog} onclose={close} onclick={(event) => event.target === dialog && close()}>
	<div class="modal-card">
		<div class="modal-head">
			<div>
				<p class="eyebrow">How we can help</p>
				<h2>Services, without<br />the mystery.</h2>
			</div>
			<button class="close" type="button" onclick={close} aria-label="Close services">Close</button>
		</div>

		<div class="service-list">
			{#each services as service (service.number)}
				<article>
					<span>{service.number}</span>
					<div>
						<h3>{service.title}</h3>
						<p>{service.summary}</p>
					</div>
					<ul>
						{#each service.deliverables as item (item)}
							<li>{item}</li>
						{/each}
					</ul>
				</article>
			{/each}
		</div>

		<div class="modal-foot">
			<p>This is a preview. Project enquiries will be enabled in the next release.</p>
			<span>Available Q4 2026</span>
		</div>
	</div>
</dialog>

<style>
	dialog {
		width: min(1120px, calc(100% - 2rem));
		max-width: none;
		max-height: calc(100dvh - 2rem);
		padding: 0;
		border: 0;
		background: transparent;
		color: var(--ink);
	}

	dialog::backdrop {
		background: rgba(18, 18, 16, 0.72);
		backdrop-filter: blur(8px);
	}

	.modal-card {
		padding: clamp(1.5rem, 4vw, 4rem);
		background: var(--acid);
	}

	.modal-head {
		display: flex;
		justify-content: space-between;
		gap: 2rem;
		margin-bottom: 3rem;
	}

	h2 {
		max-width: 12ch;
		margin-top: 0.5rem;
		font-family: var(--display);
		font-size: clamp(2.8rem, 7vw, 6.5rem);
		font-weight: 400;
		line-height: 0.83;
		letter-spacing: -0.075em;
	}

	.close {
		align-self: flex-start;
		padding: 0.75rem 1rem;
		border: 1px solid currentColor;
		border-radius: 999px;
		font-size: 0.7rem;
		font-weight: 800;
		letter-spacing: 0.08em;
		text-transform: uppercase;
	}

	.service-list {
		border-top: 1px solid currentColor;
	}

	article {
		display: grid;
		grid-template-columns: 3rem 1.4fr 1fr;
		gap: 1.5rem;
		padding: 1.6rem 0;
		border-bottom: 1px solid currentColor;
	}

	article > span,
	article p,
	li {
		font-size: 0.8rem;
		line-height: 1.5;
	}

	h3 {
		margin-bottom: 0.35rem;
		font-size: clamp(1.25rem, 2.4vw, 2rem);
		letter-spacing: -0.04em;
	}

	article p {
		max-width: 48ch;
	}

	ul {
		columns: 2;
		list-style: none;
	}

	li::before {
		content: '+ ';
	}

	.modal-foot {
		display: flex;
		justify-content: space-between;
		gap: 1rem;
		padding-top: 2rem;
		font-size: 0.7rem;
		font-weight: 700;
		letter-spacing: 0.06em;
		text-transform: uppercase;
	}

	@media (max-width: 700px) {
		article {
			grid-template-columns: 2rem 1fr;
		}

		article ul {
			grid-column: 2;
		}

		.modal-foot {
			flex-direction: column;
		}
	}
</style>
