<template>
   <section class="c-content-page">
      <div class="l-container">
         <h1>{{pageContent.title}}</h1>
         <div class="c-page-content" v-html="pageContent.content"></div>
      </div>
   </section>
</template>


<script>
   export default {
      props: {
         pageContent: {
            type: Object
         }
      },

      beforeDestroy: function() {
         document.querySelector('body').classList.remove('always-sticky-menu');
      },

      mounted: function() {
         const layoutHeader = document.querySelector('header.l-header');

         document.querySelector('body').classList.add('has-sticky-menu');
         document.querySelector('body').classList.add('always-sticky-menu');
         if( layoutHeader ) layoutHeader.classList.add('is-sticky');
      }
   }
</script>


<style lang="scss">
   section.c-content-page {
      overflow           : hidden;
      background-image   : url(/images/bgs/logo-reverse.png);
      background-repeat  : no-repeat;
      background-position: right -50px bottom;
      background-size    : 50%;
      border-bottom      : 1px solid #d6d6d6;

      div.c-page-content {
         padding-bottom: 80px;
         max-width : 1060px;

         h1 {
            margin   : 0;
            padding  : 0;
            font-size: $h3-font-size;
            color    : #000;

            @include tablet {
               font-size    : 50px;
               margin-bottom: 40px;
               line-height  : 1.2em;
            }

            @include mobile {
               font-size    : 35px;
               margin-bottom: 30px;
               line-height  : 1.2em;
            }
         }

         h3 {
            text-transform: uppercase;
            font-size     : 20px;
            font-family   : Lato;
            font-weight   : 700;
            margin        : 0 0 4px 0;
            line-height   : 1em;
         }

         h3 + h4 {
            margin-top: 10px;
         }

         h4 {
            text-transform: uppercase;
            font-size     : 16px;
            font-family   : Lato;
            font-weight   : 400;
            margin        : 0 0 10px 0;
            padding       : 0 0 14px 0;
            border-bottom: 1px solid #444;
            line-height   : 1em;
         }

         p + h4 {
            //margin-top: -10px;
         }

         p + h3 {
            margin-top: 40px;
         }

      }


   }
</style>
