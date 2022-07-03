<template>
	<main>
        <input id="search" v-model="Search" placeholder="Search..." />
		<div>
			<button 
				v-for="(item, index) in tags"
				:key="index"
				@click="filterType(item)"
			>
				{{item}}
			</button>
			<button @click="clearFilter">Clear</button>
		</div>
        <!-- <ul>
            <li v-for="(article, index) in articles" :key="index">
                <nuxt-link :to="article.path">{{ article.title }}</nuxt-link>
            </li>
        </ul> -->
	</main>
</template>

<script>
import CodingList from '/config/CodingList'
export default {
  	name: 'CodingIndex',
	head: {
		title: 'Coding notes | 叩叮 | IngridKao',
		meta: [
			{ hid: 'description', name: 'description', content: '叩叮 | Coding'}
		]
	},
	data(){
		return {
			// Search: this.$router? this.$router.query.q: "",
			Search: "",
			tags: ['Vue', 'Nuxt', 'Git'],
			articles: CodingList.map(item => item.url)
		}
	},
	watch: {
		Search () {
			console.log(this.$router);
			// this.$router.replace({ 
			// 	query: this.Search ? { q: this.Search } : undefined 
			// }).catch(() => { })
		}
	},
	watchQuery: true,
	methods:{
		filterType(type){
			this.articles = CodingList.filter(item => item.tag === type)
		},
		clearFilter(){
			this.articles = CodingList.map(item => item.url)
		}
	}
}
</script>
