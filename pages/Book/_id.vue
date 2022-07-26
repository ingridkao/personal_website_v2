<template>
	<main class="blog_container">
		<div class="prose lg:prose-lg col-span-2">
			<NuxtContent
				class="prose lg:prose-lg mb-20"
				:document="document"
			/>
		</div>
		<TOC :toc="toc"/>
		<Utterances/>
	</main>
</template>

<script>
export default {
	async asyncData ({ $content, route, error }) {
		const Search = route? route.params.id: ""
		if (Search) {
			const query = $content('Book').search(Search)
			try {
				const articles = await query.fetch()
				return { 
					document: articles[0],
					toc: articles[0]['toc']
				}
			} catch(e) {
				error({
					statusCode: 400,
					message: e
				})
			}
		}else{
      		error({ statusCode: 404, message: 'Post not found' })
			return { articles: null, toc: [] }
		}
	}
}
</script>