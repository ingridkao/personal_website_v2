<template>
    <div>
        <h2>Nuxt.js Blog</h2>

        <input id="search" v-model="Search" placeholder="Search..." />

        <ul>
            <li v-for="article in articles" :key="article.slug">
                <nuxt-link :to="article.path">{{ article.title }}</nuxt-link>
            </li>
        </ul>
    </div>
</template>
<script>
export default {
	async asyncData ({ $content, route }) {
		const Search = route? route.query.q: ""
		let query = $content('Book', { deep: true })
		// .only(['title', 'description', 'image', 'path'])
		// .sortBy('date', 'desc')
		if (Search) {
			// query = query.search('title', q)
			query = query.search(Search)
		}
		try {
			const Articles = await query.fetch()
            console.log(Articles);
			return {
				Search,
				articles: Articles? Articles: []
			}
		} catch(error) {
			console.log(`Error: ${error}`);
		}
	},
	watch: {
		Search () {
			this.$router.replace({ 
				query: this.Search ? { q: this.Search } : undefined 
			}).catch(() => { })
		}
	},
	watchQuery: true
}
</script>
