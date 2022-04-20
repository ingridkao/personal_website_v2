import Sitemap from './config/sitemap'

const Info = {
  locale: "zh-TW",
  title: "Ingrid Kao",
  description: "放一些日常",
  url: "https://www.ingridkao.net/",
  image: "mainImage.png"
}

// Global page headers: https://go.nuxtjs.dev/config-head
export default {
  head: {
    htmlAttrs: {
      lang: Info.locale
    },
    title: Info.title,
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },

      { hid: "og:type",  property: "og:type", content: "website" },
      { hid: "og:locale",property: "og:locale", content: Info.locale },
      { hid: "og:title", property: "og:title", content: Info.title },
      { hid: "og:site_name",  property: "og:site_name", content: Info.title },
      { hid: "twitter:title", name: "twitter:title", content: Info.title },

      { hid: "og:url",   property: "og:url", content: Info.url },
      { hid: "twitter:url", name: "twitter:url", content: Info.url },

      { hid: 'description', name: 'description', content: Info.description},
      { hid: "og:description", property: "og:description", content: Info.description },
      { hid: "twitter:description", name: "twitter:description", content: Info.description },

      { hid: "og:image", property: "og:image", content: Info.image },
      { hid: "twitter:image", name: "twitter:image", content: Info.image }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: 'favicon.ico' }
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/tailwindcss
    '@nuxtjs/tailwindcss',
    //https://github.com/nuxt-community/color-mode-module/issues/25
    '@nuxtjs/color-mode',
    // https://github.com/janniks/vue-notion
    'vue-notion/nuxt'
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    //https://github.com/nuxt-community/proxy-module
    '@nuxtjs/proxy',
    // https://go.nuxtjs.dev/content
    '@nuxt/content',
    // https://sitemap.nuxtjs.org
    '@nuxtjs/sitemap'
  ],

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    // Workaround to avoid enforcing hard-coded localhost:3000: https://github.com/nuxt-community/axios-module/issues/308
    proxy: true,
    prefix: '/notion_api',
  },

  proxy: {
    '/notion_api/': {
      target: 'https://api.notion.com/v1', 
      changeOrigin: true, 
      pathRewrite: {
        '^/notion_api': '',
      }
    }
  },

  // set the classSuffix option to an empty string: https://color-mode.nuxtjs.org/#live-demo
  colorMode: {
    classSuffix: '',
  },

  // Content module configuration: https://go.nuxtjs.dev/config-content
  content: {},

  sitemap: Sitemap,

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    postcss: {
      plugins: {
        tailwindcss: {},
        autoprefixer: {}
      }
    }
  },

  //https://www.nuxtjs.cn/faq/github-pages
  target: 'static',
  router: {
    base: '/personal_website_v2/',
    // https://nuxtjs.org/docs/features/file-system-routing#extendroutes
    extendRoutes(routes, resolve) {
      routes.push({
        name: 'custom',
        path: '*',
        component: resolve(__dirname, 'pages/404.vue')
      })
    }
  },

  // https://nuxtjs.org/docs/features/loading
  loading: {
    color: '#7acedc',
    height: '3px'
  }
}
