<script lang="ts">
	import Section from '../components/Section.svelte';
	import TryTerminal from './TryTerminal.svelte';
	import type { Snippet } from 'svelte';

	let { content_heading, content }: { content_heading?: Snippet; content?: Snippet } = $props();
</script>

<Section>
	<div class="grid" style="--columns: 2">
		<div class="copy">
			<h2>
				{#if content_heading}{@render content_heading()}{:else}see for yourself{/if}
			</h2>
			<div>
				{#if content}{@render content()}{:else}
					Try it locally, <a target="_blank" rel="noreferrer" href="https://sveltekit.new"
						>on StackBlitz</a
					>, or with
					<a target="_blank" href="https://svelte.dev/tutorial">the interactive tutorial</a>.
				{/if}
			</div>
		</div>

		<div class="try">
			<TryTerminal />
		</div>
	</div>
</Section>

<style>
	.grid {
		display: grid;
		gap: 2em;
		margin: 0 0 4rem 0;
	}

	.grid:last-child {
		margin-bottom: 0;
	}

	.try {
		width: 100%;
		margin: 0 auto;
		color: var(--sk-text-1);
	}

	.copy {
		text-align: left;
		font: var(--sk-font-body);
	}

	h2 {
		display: inline-block;
		margin: 0 0 1rem;
	}

	@media (min-width: 900px) {
		.grid {
			grid-template-columns: repeat(var(--columns), 1fr);
			gap: 7rem;
		}

		.copy {
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: center;
			order: 2;
		}

		.copy div {
			max-width: 15em;
			text-align: center;
		}
	}
</style>
