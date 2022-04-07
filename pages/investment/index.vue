<template>
	<main>
		<h1>
			理財＋投資
		</h1>
		<div class="chartWrapper">
			Chart
		</div>
		<div class="tableWrapper">
			<span v-for="(item, index) in articles" :key="index">{{item.title}}</span>
		</div>
	</main>
</template>

<script>
import InvestmentList from '/config/InvestmentList'
export default {
	name: 'InvestmentIndex',
	head: {
		title: '投資Investment | IngridKao',
		meta: [
			{ hid: 'description', name: 'description', content: '投資筆記'}
		],
	},
	data(){
		return {
			articles: Object.values(InvestmentList)
		}
	}
}
</script>
