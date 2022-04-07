<template>
	<main>
		<h1>
			踩雷紀錄
		</h1>
		<div>
			<span v-for='(item, index) in tags' :key='index'>{{item}}</span>
		</div>
		<div class="tableWrapper">
			<span v-for="(item, index) in articles" :key="index">{{item.title}}</span>
		</div>
	</main>
</template>

<script>
import CodingList from '/config/CodingList'
export default {
  	name: 'CodingIndex',
	head: {
		title: 'Coding notes | IngridKao',
		meta: [
			{ hid: 'description', name: 'description', content: '踩雷紀錄'}
		]
	},
	data(){
		return {
			tags: ['Vue', 'Docker', 'Git'],
			articles: Object.values(CodingList)
		}
	}
}
</script>
