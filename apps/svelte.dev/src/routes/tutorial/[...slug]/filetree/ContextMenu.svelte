<!-- @component
     A context menu for the tutorial's file tree
-->
<script module>
	import { writable } from 'svelte/store';

	/**
	 * @type {import("svelte/store").Writable<{x: number; y: number; items: import('$lib/tutorial').MenuItem[]} | null>}
	 */
	let menu_items = writable(null);

	/**
	 * @param {number} x
	 * @param {number} y
	 * @param {import('$lib/tutorial').MenuItem[]} items
	 */
	export function open(x, y, items) {
		if (items.length > 0) {
			menu_items.set({ x, y, items });
		}
	}
</script>

{#if $menu_items}
	<nav style="position: fixed; z-index: 5; top:{$menu_items.y}px; left:{$menu_items.x}px">
		<div class="navbar" id="navbar">
			<ul>
				{#each $menu_items.items as item}
					<li>
						<button on:click={item.fn}>{item.label}</button>
					</li>
				{/each}
			</ul>
		</div>
	</nav>
{/if}

<svelte:window on:click={() => menu_items.set(null)} />

<style>
	.navbar {
		display: inline-flex;
		border: 1px solid rgba(0, 0, 0, 0.1);
		background-color: var(--back);
		border-radius: var(--sk-border-radius);
		overflow: hidden;
		flex-direction: column;
		filter: drop-shadow(1px 1px 4px rgba(0, 0, 0, 0.1));
	}

	ul {
		margin: 0;
		padding: 0;
		background-color: var(--sk-back-3);
		border: 1px solid var(--sk-theme-1);
	}

	li {
		display: block;
		list-style-type: none;
		width: 1fr;
	}
	li:hover {
		background-color: var(--sk-theme-1-variant);
	}

	button {
		color: var(--sk-text-2);
		width: 100%;
		text-align: left;
		border: 0px;
		padding: 0.4rem 1rem 0.2rem 1rem;
		font: var(--sk-font-ui-small);
	}

	li:first-child button {
		padding-top: 0.5rem;
	}

	li:last-child button {
		padding-bottom: 0.4rem;
	}

	button:hover {
		background-color: var(--back-api);
	}
</style>
