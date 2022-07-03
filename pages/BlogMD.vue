<template>
	<div>
		<NuxtContent
			class="prose dark:prose-invert lg:prose-lg xl:prose-2xl mx-auto"
			:document="document"
		/>
		<Utterances/>
	</div>
</template>

<script>
export default {
	async asyncData({ $content, params }) {
		try {
			const document = await $content({ deep: true })
			// .only(['title', 'description', 'image', 'path'])
			// .sortBy('createdAt', 'desc')
			.fetch()
			return { document }
		} catch (err) {
			error({
				statusCode: 404,
				message: 'Page could not be found',
			})
		}
	}
}
</script>
