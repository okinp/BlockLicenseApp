<template>
    <account-list/>
</template>
<style scoped>
	#app {
		position: fixed;
		width: 100%;
		top: 70px;
	}
</style>
<script>
    import AccountList from './SettingsPage/AccountList'
	export default {
		name: 'settings',
		components: { AccountList }
	}
</script>