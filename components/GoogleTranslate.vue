<template>
    <div class="tranlate_container notranslate mr-5">
        <button @click="showSelectMenu">
            {{selectedLangInfo? selectedLangInfo.name: null}}
        </button>
        <transition name="v-animate-zoom-in-top">
            <div
                class="eo__dropdown__menu mt-2 p-2.5 rounded-md dark:shadow-2xl bg-white dark:bg-gray-700"
                v-show="visible"
                @click="showSelectMenu"
            >
                <ul>
                    <li
                        v-for="lang in languages"
                        :key="lang.ename"
                        :data-lang-code="lang.code"
                        @click="translateHandler(lang.code)"
                    >
                        <div :class="['language', {active: lang.code === selectedLanguageCode}]">
                            <div class="flag">
                                <div :class="'language__flag language__flag--' + lang.code"/>
                            </div>
                            <div class="title">
                                {{ selectedLanguageCode === defaultLang? lang.cname: lang.ename }}
                            </div>
                        </div>
                    </li>
                </ul>
            </div>
        </transition>
        <div id="google_translate_element"></div>
    </div>
</template>
<script>
/**
 *  1. How TO - Google Translate
 *      https://www.w3schools.com/howto/howto_google_translate.asp
 *  2. This feature was heavily inspired by "v-google-translate"
 *      https://github.com/i7eo/v-google-translate/blob/master/src/packages/src/index.vue#L316
 */
const defaultLang = "zh-TW"
export default {
    name: 'GoogleTranslate',
    data() {
        return {
            defaultLang,
            visible: false,
            selectedLanguageCode: "",
            timeout: null,
            languages: [
                {
                    code: "zh-TW",
                    name: "繁體中文",
                    cname: "中文",
                    ename: "Chinese"
                },
                {
                    code: "en",
                    name: "English",
                    cname: "英语",
                    ename: "English"
                },
                {
                    code: "fr",
                    name: "Français",
                    cname: "法语",
                    ename: "French"
                },
                {
                    code: "de",
                    name: "Deutsch",
                    cname: "德语",
                    ename: "German"
                },
                {
                    code: "ja",
                    name: "にほんご",
                    cname: "日语",
                    ename: "Japanese"
                },
                {
                    code: "ko",
                    name: "한국어",
                    cname: "韩语",
                    ename: "Korean"
                }
            ]
        }
    },
    computed: {
        selectedLangInfo() {
            return this.languages.find(
                language => language.code === this.selectedLanguageCode
            )
        }
    },
    methods: {
        initUtils() {
            //Init functions related to the DOM
            this.dynamicCreateStyle = styles => {
                const style = document.createElement("style")
                style.setAttribute("type", "text/css")
                style.innerHTML = styles
                document.getElementsByTagName("head")[0].appendChild(style)
            }
            this.dynamicLoadJs = (jsUrl, fn, jsId = "") => {
                const _doc = document.querySelector("body")
                const script = document.createElement("script")
                script.setAttribute("type", "text/javascript")
                script.setAttribute("src", jsUrl)
                jsId && script.setAttribute("id", jsId)
                _doc.appendChild(script)
                script.onload = script.onreadystatechange = function () {
                    if (
                        !this.readyState ||
                        this.readyState === "loaded" ||
                        this.readyState === "complete"
                    ) {
                        fn && fn()
                    }
                    script.onload = script.onreadystatechange = null
                }
            }
            this.getCookie = name => {
                const value = "; " + document.cookie
                const parts = value.split("; " + name + "=")
                if (parts.length >= 2) {
                    return decodeURIComponent(parts.pop().split(";").shift())
                } else {
                    return undefined
                }
            }
            this.mainObserver = (target, optionName, callback) => {
                if (!target) return
                //透過MutationmainObserver追蹤 DOM 的變化，可以當作為『觀察者』
                //當這位觀察者監測到節點變動，他就會執行設定好的任務(callback)
                const MutationmainObserver =
                    window.MutationObserver ||
                    window.WebKitMutationObserver ||
                    window.MozMutationObserver
                if (MutationObserver) {
                    const optionsMap = {
                        attribute: {
                            attribute: true,
                            attributeOldValue: true
                        },
                        child: {
                            childList: true,
                            subtree: true
                        }
                    }
                    const Observer = new MutationObserver(MutationRecords => {
                        //這個陣列會存放 MutationRecord 物件，該物件記錄著 DOM 變動的相關資訊，後面再詳細介紹。
                        MutationRecords.map(record => {
                            callback && callback(record)
                        })
                    })
                    // target: 受到觀察的DOM『節點』。
                    // optionsMap[optionName]: 指定DOM節點的『哪些項目』需要被觀察。
                    Observer.observe && Observer.observe(target, optionsMap[optionName])
                    return Observer
                }
            }
        },
        initGoogleTranslate() {
            const createStyle = () => {
                this.dynamicCreateStyle(
                    `body { top: 0 !important; } .skiptranslate { display: none !important; }`
                )
            }
            const createJsonCallback = () => {
                window.googleTranslateElementInit = () => {
                    new window.google.translate.TranslateElement(
                        { pageLanguage: defaultLang , autoDisplay: false },
                        "google_translate_element"
                    )
                    this.setSelectedLanguageCode()
                }
            }
            const createScript = () => {
                this.dynamicLoadJs(
                    "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit",
                    () => {
                        this.GTranslateEventTrigger = (SelectEl) => {
                            try {
                                if (document.createEvent) {
                                    //事件觸發器-chrome,firefox等
                                    const EventObj = document.createEvent("HTMLEvents")
                                    EventObj.initEvent("change", true, true)
                                    SelectEl.dispatchEvent(EventObj)
                                } else {
                                    //事件觸發器-IE
                                    const EventObj = document.createEventObject()
                                    SelectEl.fireEvent("onchange", EventObj)
                                }
                            } catch (e) {
                                console.warn(
                                    `google transltate dispatch event has error: ${e}`
                                )
                            }
                        }
                        this.doGTranslate = selected => {
                            if (selected.value) selected = selected.value
                            if (selected === "") return
                            // 欲新增的翻譯工具容器
                            const googTranContainer = document.querySelector(".tranlate_container")
                            // 原本的語言翻譯小工具
                            const googTranSelect = document.querySelector(".goog-te-combo")

                            // Comfirm google translate select observer exists.
                            if (
                                googTranContainer == null ||
                                googTranContainer.innerHTML.length === 0 ||
                                googTranSelect.options.length === 0
                            ){
                                //沒有東西存在
                                this.googleTranslateSelectObserver()
                            } else {
                                googTranSelect.value = selected
                                this.GTranslateEventTrigger(googTranSelect)
                                this._googleTranslateSelectObserver &&
                                this._googleTranslateSelectObserver.disconnect()
                            }
                        }
                    }
                )
            }
            createStyle()
            createJsonCallback()
            createScript()
        },
        googleTranslateSelectObserver() {
            //觀察的DOM節點 -> .goog-te-combo
            //DOM節點項目需要被觀察 -> .goog-te-combo的child(option)
            this._googleTranslateSelectObserver = this.mainObserver(
                document.querySelector(".goog-te-combo"),
                "child",
                record => {
                    if (record.addedNodes[0] && record.addedNodes[0].value) {
                        if (this.selectedLanguageCode === record.addedNodes[0].value) {
                            this.doGTranslate(record.addedNodes[0].value);
                        }
                    }
                }
            )
        },
        htmlLangObserver() {
            //觀察的DOM節點-html
            //DOM節點項目需要被觀察 -> html的attribute
            this._htmlLangObserver = this.mainObserver(
                document.querySelector("html"),
                "attribute",
                record => {
                    if (record.attributeName === "lang") {
                        const currentValue = record.target.getAttribute("lang")
                        const oldValue = record.oldValue
                        if (
                            oldValue !== currentValue &&
                            oldValue &&
                            oldValue !== "auto" &&
                            currentValue === "auto"
                        ) {
                            this.translateHandler(this.selectedLanguageCode)
                        }
                    }
                }
            )
        },
        setSelectedLanguageCode() {
            const googleCookieLanguage = this.getGoogleCookieLanguage()
            const isGoogleCookieLanguageExist = !!googleCookieLanguage
            const handleBrowserLanguageInLanguages = () => {
                const browserLanguage = this.getBrowserLanguage()
                const isBrowserLanguageInLanguages = !!this.languages.find(
                    language => language.code === browserLanguage
                )
                if (isBrowserLanguageInLanguages) {
                    return browserLanguage;
                } else {
                    return defaultLang
                }
            };
            const handleGoogleCookieLanguageInLanguages = () => {
                const isGoogleCookieLanguageInLanguages = !!this.languages.find(
                    language => language.code === googleCookieLanguage
                );
                if (isGoogleCookieLanguageInLanguages) {
                    return googleCookieLanguage
                } else {
                    return defaultLang
                }
            };
            let selectedCode = defaultLang
            if (!isGoogleCookieLanguageExist) {
                // 首次
                selectedCode = handleBrowserLanguageInLanguages()
            } else {
                // 非首次
                // 越过浏览器语言判断直接去列表中匹配
                selectedCode = handleGoogleCookieLanguageInLanguages()
            }
            this.translateHandler(selectedCode)
        },
        getBrowserLanguage() {
            const browserLanguage =
                navigator.language ||
                navigator.browserLanguage ||
                document.documentElement.lang
            const filterLanguages = ["zh-CN", "zh-TW"];
            if (filterLanguages.every(l => l !== browserLanguage)) {
                if (browserLanguage.indexOf("-") > -1) {
                    return browserLanguage.split("-")[0];
                }
            }
            return browserLanguage
        },
        getGoogleCookieLanguage() {
            const googleTranslateCookie = this.getCookie("googtrans")
            if (googleTranslateCookie) {
                const googleTranslateCookieResult = googleTranslateCookie.split("/")
                return googleTranslateCookieResult[2]
                ? googleTranslateCookieResult[2]
                : defaultLang
            } else {
                return "";
            }
        },
        translateHandler(code){
            this.doGTranslate(code)
            this.selectedLanguageCode = code
        },
        showSelectMenu() {
            this.visible = !this.visible
            if(this.timeout){
                clearTimeout(this.timeout)
            }
            if(this.visible){
                //5sec
                this.timeout = setTimeout(() => {
                    this.visible = false
                }, 5000)
            }
        }
    },
    created() {
        this.initUtils()
    },
    mounted() {
        this.initGoogleTranslate()
        this.htmlLangObserver()
    },
    beforeDestroy() {
        if(this._googleTranslateSelectObserver){
            this._googleTranslateSelectObserver.disconnect()
        }
        if(this._htmlLangObserver){
            this._htmlLangObserver.disconnect()
        }
    }
}
</script>
<style scoped>
.tranlate_container{
    position: relative;
}
.eo__dropdown__menu{
    position: absolute;
    top: 100%;
    left: 0;
    z-index: 10011;
    box-shadow: 0 2px 12px 0 rgb(34 34 34 / 5%);
    overflow-y: auto;
    max-height: 400px;
}
.eo__dropdown__menu::-webkit-scrollbar {
    width: 5px;
}
.eo__dropdown__menu::-webkit-scrollbar-thumb,
.eo__dropdown__menu::-webkit-scrollbar-track {
    border-radius: 10px;
    background-color: #e0e0e0;
}
.eo__dropdown__menu ul {
    padding: 0;
    margin: 0;
    box-sizing: border-box;
    -webkit-tap-highlight-color: transparent;
    list-style: none;
}
.eo__dropdown__menu li {
    position: relative;
    line-height: 48px;
    font-weight: 500;
    letter-spacing: 0.1em;
}
.eo__dropdown__menu li:before {
    content: "";
    position: absolute;
    left: 0;
    bottom: -2px;
    width: 100%;
    height: 2px;
    background: rgba(34, 34, 34, 0.08);
    transition: all 0.6s;
    transform: scale(0);
}
.eo__dropdown__menu li:hover:before {
    transform: scale(1);
}
.language {
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: flex-start;
}
.language.active{
    cursor: not-allowed;
    opacity: 0.25;
}
.language .flag {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 40px;
    height: 40px;
    margin-right: 5px;
}
.language .title {
    min-width: 40px;
}
.language:hover .language__flag{
    filter: drop-shadow(2px 4px 6px rgba(0,0,0,.5));
}
.language__flag {
    width: 35px;
    height: 35px;
    background-image: url(../assets/img/language-flags.png);
}
.language__flag--af {  background-position: 0px 0px;}
.language__flag--ar {  background-position: -40px 0px;}
.language__flag--az {  background-position: 0px -40px;}
.language__flag--be {  background-position: -40px -40px;}
.language__flag--bg {  background-position: -80px 0px;}
.language__flag--ca {  background-position: -80px -40px;}
.language__flag--cs {  background-position: 0px -80px;}
.language__flag--da {  background-position: -40px -80px;}
.language__flag--de {  background-position: -80px -80px;}
.language__flag--el {  background-position: -120px 0px;}
.language__flag--en {  background-position: -120px -40px;}
.language__flag--es {  background-position: -120px -80px;}
.language__flag--et {  background-position: 0px -120px;}
.language__flag--eu {  background-position: -40px -120px;}
.language__flag--fi {  background-position: -80px -120px;}
.language__flag--fr {  background-position: -120px -120px;}
.language__flag--ga {  background-position: -160px 0px;}
.language__flag--hr {  background-position: -160px -40px;}
.language__flag--hu {  background-position: -160px -80px;}
.language__flag--hy {  background-position: -160px -120px;}
.language__flag--id {  background-position: 0px -160px;}
.language__flag--it {  background-position: -40px -160px;}
.language__flag--ja {  background-position: -80px -160px;}
.language__flag--ko {  background-position: -120px -160px;}
.language__flag--lt {  background-position: -160px -160px;}
.language__flag--ms {  background-position: -200px 0px;}
.language__flag--nl {  background-position: -200px -40px;}
.language__flag--no {  background-position: -200px -80px;}
.language__flag--pl {  background-position: -200px -120px;}
.language__flag--pt {  background-position: -200px -160px;}
.language__flag--ro {  background-position: 0px -200px;}
.language__flag--ru {  background-position: -40px -200px;}
.language__flag--sq {  background-position: -80px -200px;}
.language__flag--sv {  background-position: -120px -200px;}
.language__flag--th {  background-position: -160px -200px;}
.language__flag--tl {  background-position: -200px -200px;}
.language__flag--tr {  background-position: -240px 0px;}
.language__flag--uk {  background-position: -240px -40px;}
.language__flag--zh-CN {  background-position: -240px -80px;}
.language__flag--zh-TW {  background-position: -240px -120px;}

.v-animate-zoom-in-top-enter-active,
.v-animate-zoom-in-top-leave-active {
    opacity: 1;
    transform: scaleY(1);
    transition: transform 0.3s cubic-bezier(0.23, 1, 0.32, 1),
        opacity 0.3s cubic-bezier(0.23, 1, 0.32, 1);
    transform-origin: center top;
}
.v-animate-zoom-in-top-enter,
.v-animate-zoom-in-top-leave-active {
    opacity: 0;
    transform: scaleY(0);
}
</style>