export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'IngridKao',
    htmlAttrs: {
      lang: 'zh-TW'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'my website description'}
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
  ],

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
    '@nuxt/content'
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

  purgeCSS: {
    whitelist: ['dark-mode']
  },

  // Content module configuration: https://go.nuxtjs.dev/config-content
  content: {},

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
    color: 'blue',
    height: '5px'
  }
}
