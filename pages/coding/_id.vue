<template>
	<main class="blog_container">
		<NuxtContent
			class="prose lg:prose-lg mb-20"
			:document="document"
		/>
		<Utterances/>
	</main>
</template>

<script>
export default {
	async asyncData ({ $content, route, error }) {
		const Search = route? route.params.id: ""
		if (Search) {
			const query = $content('Coding').search(Search)
			try {
				const articles = await query.fetch()
				return { document: articles[0] }
			} catch(e) {
				error({
					statusCode: 400,
					message: e
				})
			}
		}else{
      		error({ statusCode: 404, message: 'Post not found' })
			return { articles: null }
		}
	}
}
</script>