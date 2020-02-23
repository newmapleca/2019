const fs = require('fs');

export default {
   mode: 'universal',
   /*
   ** Headers of the page
   */
   head: {
      title: "New Maple",
      meta: [
         { charset: 'utf-8' },
         { name: 'viewport', content: 'width=device-width, initial-scale=1' },

         { hid: 'og:site_name',        property: 'og:site_name',        content: 'New Maple Holdings' },
         { hid: 'og:type',             property: 'og:type',             content: 'site' },

         { hid: 'title',               name: 'title',                   content: "New Maple Holdings" },
         { hid: 'og:title',            property: 'og:title',            content: "New Maple Holdings" },
         { hid: 'twitter:title',       property: 'twitter:title',       content: "New Maple Holdings" },

         { hid: 'description',         name: 'description',             content: "Cultivating joy, relief and peace in people everywhere" },
         { hid: 'og:description',      property: 'og:description',      content: "Cultivating joy, relief and peace in people everywhere" },
         { hid: 'twitter:description', property: 'twitter:description', content: "Cultivating joy, relief and peace in people everywhere" },

         { hid: 'og:url',              property: 'og:url',              content: "https://newmaple.ca" },
         { hid: 'og:image',            property: 'og:image',            content: "https://newmaple.ca/images/newmaple-social.png" },
         { hid: 'og:image',            property: 'og:image:secure_url', content: "https://newmaple.ca/images/newmaple-social.png" },
         { hid: 'twitter:image:src',   name: 'twitter:image:src',       content: "https://newmaple.ca/images/newmaple-social.png" },
         { hid: 'twitter:card',        name: 'twitter:card',            content: "summary_large_image" },

      ],
      link: [
         { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
      ],

      htmlAttrs: {
         lang: 'en'
      },
      script: [
         //{ src: `https://cdn.polyfill.io/v2/polyfill.min.js?features=Intl.~locale.en`, body: true },
      ],
   },
   /*
   ** Customize the progress-bar color
   */
   loading: { color: '#fff' },
   /*
   ** Global CSS
   */
   css: [

   ],

   /*
   ** Plugins to load before mounting the App
   */
   plugins: [
      { src: '~/plugins/vue-waypoint', ssr: false }
   ],
   /*
   ** Nuxt.js dev-modules
   */
   devModules: [
   ],

   // Configure polyfills:
   polyfill: {
      features: [{
         require: 'object-fit-videos'
      },{
         require: 'smoothscroll-polyfill',
         detect: () => 'scrollBehavior' in document.documentElement.style && window.__forceSmoothScrollPolyfill__ !== true,
         install: (smoothscroll) => smoothscroll.polyfill()
      }]
   },

   /*
   ** Nuxt.js modules
   */
   modules: [
      '@nuxtjs/style-resources',
      'nuxt-webfontloader',
      'nuxt-polyfill',
      '~/modules/homepage',
      '~/modules/content-pages',
   ],

   // server: {
   //    port: 3000, // default: 3000
   //    host: '192.168.1.80', // default: localhost
   // },

   build: {
      html : {
         minify: {
              collapseBooleanAttributes : true,
              decodeEntities            : true,
              minifyCSS                 : false, // This is not the default
              minifyJS                  : true,
              processConditionalComments: true,
              removeEmptyAttributes     : true,
              removeRedundantAttributes : true,
              trimCustomFragments       : true,
              useShortDoctype           : true
         }
      },

      extend( config, { isDev, isClient } ) {
         // fix: "Uncaught ReferenceError: global is not defined", and "Can't resolve 'fs'".
         if( isDev ) {
            config.node = { global: true, fs: 'empty' };
         }
      }
   },

   styleResources: {
      scss: [
         'assets/scss/_normalize.scss',
         'assets/scss/_main.scss'
      ]
   },

   webfontloader: {
      google: {
         families: ['Archivo+Black|Lato:400,700,900&display=swap']
      }
   },

   /*
    * extend router for dynamic pages
    */
   router: {
      extendRoutes (routes, resolve) {

         // blog pagination
         routes.push({
            path: '/:page',
            component: resolve(__dirname, 'pages/_page.vue')
         })
      }
   },

   generate: {
      routes: () => {

         let dynamicRoutes = []

         // pages
         let rawPages = fs.readFileSync('static/data/pages.json');
         let allPages = JSON.parse(rawPages);
             allPages.forEach( function( rec, index ) { dynamicRoutes.push( `/${rec.slug}/`  ) });

         return dynamicRoutes;
      }
   }
}
