<template>
    <div id="comment"/>
</template>
<script>
export default {
    name: 'Utterances',
    computed: {
        colorMode() {
            return this.$colorMode.preference === "dark"? "dark" :"light"
        }
    },
    mounted(){
        this.createUtterances()
    },
    methods: {
        createUtterances(){
            // src="https://utteranc.es/client.js"
            // repo="ingridkao/personal_website_issue"
            // issue-term="pathname"
            // theme="github-dark"
            // crossorigin="anonymous"
            // async
            const Utterances = document.createElement('script')
            const Comment = document.getElementById('comment')
            Utterances.type = 'text/javascript'
            Utterances.src = 'https://utteranc.es/client.js'
            Utterances.setAttribute('repo','ingridkao/personal_website_issue')
            // Utterances.setAttribute('issue-number', this.id)
            Utterances.setAttribute('issue-term', 'pathname')
            Utterances.setAttribute('theme',`github-${this.colorMode}`)
            Utterances.crossorigin = 'anonymous'
            Utterances.async = true

            Comment.appendChild(Utterances)
        }
    }
}
</script>