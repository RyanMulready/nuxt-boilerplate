export default {
    // Disable server-side rendering: https://go.nuxtjs.dev/ssr-mode
    ssr: false,

    // Global page headers: https://go.nuxtjs.dev/config-head
    head: {
        title: 'Profile Service POC',
        meta: [
            { charset: 'utf-8' },
            { name: 'viewport', content: 'width=device-width, initial-scale=1' },
            { hid: 'description', name: 'description', content: '' },
            { name: 'format-detection', content: 'telephone=no' },
        ],
        link: [
            { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
        ],
    },
    // https://github.com/nuxt/telemetry#opting-out
    telemetry: false,

    // Global CSS: https://go.nuxtjs.dev/config-css
    css: [
        '@/assets/scss/bs4.scss',
    ],

    // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
    plugins: [
        { src: '@/plugins/api.js' },
    ],

    // Auto import components: https://go.nuxtjs.dev/config-components
    components: true,

    // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
    buildModules: [
        // https://github.com/nuxt/postcss8
        '@nuxt/postcss8',
        // https://go.nuxtjs.dev/eslint
        '@nuxtjs/eslint-module',
        // https://go.nuxtjs.dev/stylelint
        '@nuxtjs/stylelint-module',
        // https://github.com/nuxt-community/style-resources-module
        '@nuxtjs/style-resources',
    ],

    // Modules: https://go.nuxtjs.dev/config-modules
    modules: [
        // https://bootstrap-vue.org/docs
        'bootstrap-vue/nuxt',
        // https://go.nuxtjs.dev/axios
        '@nuxtjs/axios',
        // https://go.nuxtjs.dev/pwa
        '@nuxtjs/pwa',
        // https://github.com/nuxt-community/date-fns-module
        '@nuxtjs/date-fns',
        // https://i18n.nuxtjs.org/
        '@nuxtjs/i18n',
        // https://github.com/nuxt-community/robots-module
        '@nuxtjs/robots',
        // https://github.com/nuxt-community/sitemap-module
        '@nuxtjs/sitemap',
        // https://github.com/microcipcip/cookie-universal/tree/master/packages/cookie-universal-nuxt
        'cookie-universal-nuxt',
    ],

    // Needed for SCSS compilation
    module: {
        rules: [
            {
                test: /\.s[ac]ss$/i,
                use: ['style-loader', 'css-loader', 'sass-loader'],
            },
        ],
    },

    // Build Configuration: https://go.nuxtjs.dev/config-build
    build: {
    },

    // https://nuxtjs.org/docs/configuration-glossary/configuration-runtime-config/
    publicRuntimeConfig: {
        AWS_USER_PROFILE_API: process.env.AWS_USER_PROFILE_API,
    },

    // Axios module configuration: https://go.nuxtjs.dev/config-axios
    axios: {
        // Workaround to avoid enforcing hard-coded localhost:3000: https://github.com/nuxt-community/axios-module/issues/308
        baseURL: '/',
    },

    // PWA module configuration: https://go.nuxtjs.dev/pwa
    pwa: {
        manifest: {
            lang: 'en',
        },
    },

    // https://bootstrap-vue.org/docs
    bootstrapVue: {
        bootstrapCSS: false,
        bootstrapVueCSS: false,
    },

    // https://github.com/nuxt-community/style-resources-module
    styleResources: {
        scss: [
            '@/assets/scss/variables.scss',
        ],
        hoistUseStatements: true,
    },

    // https://i18n.nuxtjs.org
    i18n: {
        locales: ['en'],
        defaultLocale: 'en',
        vueI18n: {
            fallbackLocale: 'en',
            messages: {
                en: {
                    welcome: 'Welcome',
                },
            },
        },
    },

    // https://github.com/nuxt-community/robots-module
    robots: {
        UserAgent: '*',
        Disallow: '/',
    },
};
