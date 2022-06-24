<template>
    <div>
        123
        <!-- <input 
            id="search"
            v-model="search"
            placeholder="Search..."
        /> -->
        <!-- <ul>
            <li 
                v-for="article in articles" 
                :key="article.slug"
            >
                <nuxt-link :to="article.path">
                    {{ article.title }}
                </nuxt-link>
            </li>
        </ul> -->
    </div>
</template>
<script>
export default {
    props: {
        pageIndex: {
            type: String,
            default: ''
        }
    },
	async asyncData ({ $content, route, params }) {
        console.log($content);
        console.log(route);
        console.log(params);
        console.log('----------');
		// const Search = route? route.query.q: ""
		// let query = $content(pageIndex, { deep: true })
		// // .only(['title', 'description', 'image', 'path'])
		// // .sortBy('date', 'desc')
		// if (Search) {
		// 	// query = query.search('title', q)
		// 	query = query.search(Search)
		// }
		// try {
		// 	const Articles = await query.fetch()
        //     console.log(Articles);
		// 	return {
		// 		search: Search,
		// 		articles: Articles? Articles: []
		// 	}
		// } catch(error) {
		// 	console.log(`Error: ${error}`);
		// }
	},
	watch: {
		search () {
			this.$router.replace({ 
				query: this.search ? { q: this.search } : undefined 
			}).catch(() => { })
		}
	},
	watchQuery: true
}
</script>
