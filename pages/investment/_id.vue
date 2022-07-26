<template>
	<main>
		<BlogIndex :content="'Investment'"/>
		<!-- <NuxtContent
			class="prose lg:prose-lg xl:prose-2xl mx-auto"
			:document="document"
		/> -->
		<Utterances/>
	</main>
</template>

// <script>
// export default {
// 	async asyncData ({ $content, route }) {
// 		const Search = route? route.params.id: ""
// 		let query = await $content('Investment')
// 		if (Search) {
// 			query = query.search(Search)
// 			try {
// 				const document = await query.fetch()
// 				return { document: document[0] }
// 			} catch(error) {
// 				console.log(`Error: ${error}`);
// 			}
// 		}else{
// 			error({
// 				statusCode: 404,
// 				message: 'Page could not be found',
// 			})
// 			return { document: null }
// 		}
// 	}
// }
// </script>