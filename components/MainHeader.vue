<template>
    <nav class="
        shadow-md
        text-gray-400
    ">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="flexItemsCenter justify-between h-16">
                <div class="flex-items-center">
                    <NuxtLink to="/">
                        <img class="h-8 w-8" src="~/static/icon.png" alt="Ingrid Kao">
                    </NuxtLink>
                </div>
                <div class="hidden md:block">
                    <div class="flexItemsCenter ml-4 md:ml-6">
                        <div class="mr-10 flex items-baseline">
                            <NuxtLink 
                                v-for="(linkItem, linkIndex) in MainLink" :key="linkIndex"
                                :to="linkItem.url" 
                                class="navItem navBtnStyle"
                            >
                                <div class="text-sm font-medium">{{linkItem.title}}</div>
                                <div class="text-xs">{{linkItem.subtitle}}</div>
                            </NuxtLink>
                        </div>
                        <GoogleTranslate/>
                        <ColorToggle/>
                        <button
                            @click="toggleProfile"
                            class="ml-5"
                        >
                            <img
                                class="h-6 w-6 rounded-full"
                                src="https://lh3.googleusercontent.com/ogw/ADea4I7qk-RRHHMefYLiY7NPU8fV5i7vBMrK6PP8I2273zI=s64-c-mo"
                                alt
                            >
                        </button>
                    </div>
                </div>

                <div class="-mr-2 flex md:hidden">
                    <!-- Mobile menu button -->
                    <button
                        @click="toggleMenu"
                        class="inline-flex items-center justify-center p-2 rounded-md navBtnStyle"
                    >
                    <svg
                        :class="[isOpenMenu ? 'hidden' : 'block', 'h-6 w-6']"
                        stroke="currentColor"
                        fill="none"
                        viewBox="0 0 24 24"
                    >
                        <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M4 6h16M4 12h16M4 18h16"
                        />
                    </svg>
                    <svg
                        :class="[isOpenMenu ? 'block' : 'hidden', 'h-6 w-6']"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        fill="none"
                    >
                        <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M6 18L18 6M6 6l12 12"
                        />
                    </svg>
                    </button>
                </div>
            </div>
        </div>
        <div :class="[isOpenMenu ? '' : 'hidden', 'md:hidden']">
            <div class="px-2 pt-2 pb-3 sm:px-3">
                <NuxtLink 
                    v-for="(linkItem, linkIndex) in MainLink" :key="linkIndex"
                    :to="linkItem.url" 
                    class="navMobileItem navBtn"
                >
                    <div class="text-sm font-medium">{{linkItem.title}}</div>
                    <div class="text-xs">{{linkItem.subtitle}}</div>
                </NuxtLink>
            </div>
            <div class="flexItemsCenter justify-between pt-4 pb-3 px-5">
                <Profile :menu="false"/>
                <ColorToggle/>
            </div>
        </div>
        <div :class="[isOpenProfile ? '' : 'hidden', 'absolute right-1.5 mt-2 p-5 rounded-md dark:shadow-2xl bg-white dark:bg-gray-700']">
            <Profile :menu="true"/>
        </div>
    </nav>
</template>

<script>
import ColorToggle from './ColorToggle.vue'
import GoogleTranslate from './GoogleTranslate.vue'
import Profile from './Profile.vue'
import { MainLink } from '/config/sitemap'
export default {
    components: { ColorToggle, GoogleTranslate, Profile },
    name: 'MainHeader',
    data() {
        return {
            isOpenMenu: false,
            isOpenProfile: false,
            MainLink: MainLink,
            languages:[
                {
                    code: "en",
                    name: "English",
                    cname: "英语",
                    ename: "English",
                },
                {
                    code: "zh-TW",
                    name: "Chinese (Traditional)",
                    cname: "中文 (繁体)",
                    ename: "Chinese (Traditional)",
                },
                {
                    code: "ja",
                    name: "にほんご",
                    cname: "日语",
                    ename: "Japanese",
                },
                {
                    code: "ko",
                    name: "한국어",
                    cname: "韩语",
                    ename: "Korean",
                }
            ]
        }
    },
    computed: {},
    methods: {
        toggleMenu() {
            this.isOpenMenu = !this.isOpenMenu
        },
        toggleProfile(){
            this.isOpenProfile = !this.isOpenProfile
        }
    }
}
</script>
<style scope>
    .navItem {
        @apply relative ml-4 px-3 py-2 rounded-md;
    }
    .navMobileItem {
        @apply relative block mt-1 px-3 py-2 rounded-md text-base font-medium;
    }
    .profileItem {
        @apply font-medium leading-none;
    }
    .navItem:after,
    .navMobileItem:after{
        content: '';
        @apply absolute duration-1000 bg-cyan-300;
    }
    .navMobileItem:after{
        @apply top-0 left-1 w-0.5 h-0;
    }
    .navMobileItem:hover:after{
        @apply h-full;
    }
</style>