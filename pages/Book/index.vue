<template>
    <main>
        <input id="search" v-model="Search" placeholder="Search..." />
        <ul>
            <li 
				v-for="article in articles" 
				:key="article.slug"
				class="px-3 text-gray-500 dark:text-gray-400 hover:text-gray-600 focus:outline-none focus:text-gray-500 focus:bg-gray-800"
			>
                <nuxt-link :to="article.path">{{ article.title }}</nuxt-link>
            </li>
        </ul>
    </main>
</template>
<script>

export default {
  	name: 'BookIndex',
	head: {
		title: 'Book | 閱讀 | IngridKao',
		meta: [
			{ hid: 'description', name: 'description', content: '閱讀 | Book'}
		]
	},
	async asyncData ({ $content, route }) {
		//https://content.nuxtjs.org/v1/getting-started/fetching/
		const Search = (route && route.query && route.query.q)? route.query.q: null
		let query = $content('Book', {
			deep: true 
		})
		if(Search){
			query = query.search('title', Search)
		}
		// .only(['title', 'description', 'image', 'path'])
		// .sortBy('date', 'desc')
		try {
			const Articles = await query.fetch()
			return {
				Search,
				articles: Articles? Articles: []
			}
		} catch(error) {
			error({
				statusCode: 400,
				message: `Error: ${error}`,
			})
		}
	},
	watch: {
		Search () {
			this.$router.replace({ 
				query: this.Search ? { q: this.Search } : undefined 
			}).catch(() => {})
		}
	},
	watchQuery: true
}
</script>
