<script>
import { unpick } from '@ctx-core/object'
import { Icon } from '@ctx-core/svg-ui-svelte'
export let node = null
let node__
$: node__, node = node__
let props
$: props = unpick($$props, 'class')
</script>

<Icon bind:this={node__} class="socicon {$$props.class||''}" {...props}><slot></slot></Icon>

<style>
:global(.socicon) {
	transform: rotate(180deg) scaleX(-1);
}
</style>
