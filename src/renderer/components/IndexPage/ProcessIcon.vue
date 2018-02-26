<template>
    <div class="processIcon">
    	<i v-if='action ==="loading"' class='fa fa-circle-o-notch fa-spin'></i>
    	<i v-else-if='action ==="saving"' class='fa fa-gear fa-spin'></i>
    	<i v-else-if='action ==="done"' class='fa fa-check'></i>
		<i v-else class='fa fa-exclamation-circle'></i>
    </div>
</template>
<script>
    export default {
        name: 'process-icon',
        props: ['action'],
    }
</script>
<style lang="scss" scoped>
	.processIcon {
		height: 24px;
		width: 100%;
		i {
			font-size: 24px;
			color: gray;
		}
	}
</style>