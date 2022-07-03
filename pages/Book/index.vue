<template>
    <main>
        <h2>Books</h2>

        <input id="search" v-model="Search" placeholder="Search..." />

        <ul class="">
            <li 
				v-for="article in articles" 
				:key="article.slug"
				class="px-3 text-gray-500 dark:text-gray-400 hover:text-gray-600 focus:outline-none focus:text-gray-500 focus:bg-gray-800"
			>
                <nuxt-link :to="article.path">
					{{ article.title }}
				</nuxt-link>
            </li>
        </ul>
    </main>
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
<style scope>
    /* .navItem {
        @apply ml-4 px-3 py-2 rounded-md;
    } */
</style>
