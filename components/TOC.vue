<template>
    <aside class="col-span-1 lg:flex lg:flex-col">
        {{URLPath}}
        <div class="sticky top-16">
            <h2
                class="uppercase text-black font-h2 text-lg lg:mt-16 tracking-wider"
            >
                Table of contents
            </h2>
            <nav class="mt-4">
                <ul>
                    <li
                        :class="{
                            'pl-4': link.depth === 3
                        }"
                        class="toc-list"
                        v-for="link of toc"
                        :key="link.id"
                    >
                        <a
                            role="button"
                            class="transition-colors duration-75 text-base mb-2 block"
                            :href="`${URLPath}#${link.id}`"
                        >
                            {{ link.text }}
                        </a>
                    </li>
                </ul>
            </nav>
        </div>
    </aside>
</template>

<script>
export default {
    props: {
        toc: {
            type: Array,
            default: () => []
        }
    },
    computed: {
        URLPath() {
            return this.$route.path
        }
    },

}
</script>