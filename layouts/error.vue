<template>
	<div>
		<h1 v-if="error.statusCode">{{error.statusCode}}</h1>
		<h6>{{ title }}</h6>
		<NuxtLink to="/">Home page</NuxtLink>
	</div>
</template>

<script>
//https://mavrickmaster.medium.com/custom-error-pages-with-nuxt-js-3c70e6c51aff
	export default {
		layout:'error', // you can set a custom layout for the error page,
		props: ['error'],
		computed: {
			title() {
				if(this.error.message){
					return this.error.message
				}else{
					return this.error.statusCode === 404? 'Page not found': 'An error occurred'
				}
			}
		}
	}
</script>