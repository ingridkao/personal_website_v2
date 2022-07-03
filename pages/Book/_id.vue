<template>
	<main id="blogName" class="w-full bg-gray-50 dark:bg-gray-800">
		<NuxtContent
			:document="document"
			class="text-gray-500 dark:text-gray-400"
		/>
		<Utterances/>
	</main>
</template>

<script>
export default {
	async asyncData ({ $content, route }) {
		const Search = route? route.params.id: ""
		let query = await $content('Book')
		if (Search) {
			query = query.search(Search)
			try {
				const document = await query.fetch()
				return { document: document[0] }
			} catch(error) {
				console.log(`Error: ${error}`);
			}
		}else{
			error({
				statusCode: 404,
				message: 'Page could not be found',
			})
			return { document: null }
		}
	}
}
</script>