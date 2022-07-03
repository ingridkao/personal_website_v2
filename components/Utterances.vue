<template>
    <div id="comment"></div>
</template>
<script>
export default {
    name: 'Utterances',
    // props: {
    //     // 傳入的 issue-number  
    //     id: Number
    // },
    mounted(){
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
        Utterances.setAttribute('theme','github-dark')
        Utterances.crossorigin = 'anonymous'
        Utterances.async = true

        Comment.appendChild(Utterances)
    }
}
</script>