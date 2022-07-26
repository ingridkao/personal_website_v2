<template>
    <div class="relative w-full sm:h-auto md:h-auto ">
        <div class="relative z-10 lg:w-full lg:max-w-md">
            <main class="inline-block p-16 md:pb-20 lg:pb-28 xl:pb-32 bg-gray-50 dark:bg-gray-800">
                <div class="sm:text-center lg:text-left pt-8 sm:pt-16 md:pt-20 lg:pt-28 xl:pt-32 ">
                    <h1 class="
                        text-2xl tracking-tight font-extrabold 
                        text-gray-600 dark:text-gray-300 
                        sm:text-3xl md:text-4xl
                    ">
                        <span class="block xl:inline">Data to enrich your</span>
                        <span class="block xl:inline text-blue-300">online business</span>
                    </h1>
                    <p class="
                        text-base md:text-base
                        text-gray-500 dark:text-gray-400 
                        sm:max-w-lg
                        mt-2 sm:mt-4 sm:mx-auto md:mt-4 lg:mx-0
                    ">
                        Anim aute id magna aliqua ad ad non deserunt sunt. Qui irure qui lorem cupidatat commodo. Elit sunt amet fugiat veniam occaecat fugiat aliqua.
                    </p>
                </div>
            </main>
            <svg class="
                    absolute right-0 inset-y-0 hidden lg:block 
                    h-full w-60 
                    text-gray-50 dark:text-gray-800 
                    transform translate-x-1/2
                " fill="currentColor" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
                <polygon points="50,0 100,0 50,100 0,100" />
            </svg>
        </div>
        <div class="lg:absolute lg:inset-y-0 lg:right-0 lg:w-3/5 h-full">
            <img class="w-full h-full object-cover" src="~/static/mainImage.png" alt="Ingrid Kao">
        </div>
    </div>
</template>

<script>
export default {
    name: 'Banner',
    computed: {
        dark() {
            return this.$colorMode.value === "dark"
        }
    },
    methods: {
        toggleDarkMode() {
            const Mode = this.dark ? "light": "dark"
        }
    }
}
</script>