<template>
	<div>
		<div v-if="error.statusCode === 404">
			<h1>404</h1>
			<p>Page not found</p>
		</div>
		<h1 v-else>An error occurred</h1>
    	<NuxtLink to="/">Home page</NuxtLink>

	</div>
</template>

<script>
export default {
  	name: 'ErrorPage',
    props: ['error'],
    layout: 'error' // you can set a custom layout for the error page
}
</script>
