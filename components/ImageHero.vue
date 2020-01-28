<template>
   <section class="c-imagehero c-pagehero">
      <div class="gradient"></div>

      <div class="image">
         <img src="/images/bgs/contact.cropped.jpg" data-object-fit>
      </div>

      <div class="l-container">
         <div class="c-imagehero__overlay">
            <div class="h1">Have questions about the cannabis world?</div>
         </div>
      </div>
   </section>
</template>


<script>
   export default {
      data() {
         return {

         }
      },

      computed: {

      },

      props: [],
   }
</script>


<style lang="scss" scoped>

   section.c-imagehero {
      margin-top      : -110px;
      background-color: coral;
      height          : 100vh;
      min-height      : 700px;
      position        : relative;

      div.image {

         overflow : hidden;

         img {
            width      : 100%;
            height     : 100%;
            object-fit : cover;
            font-family: 'object-fit: cover;';
         }

         width     : 100%;
         height    : 100%;
         position  : fixed;
         top       : 0;
         left      : 0;
         z-index   : 5;
      }

      div.gradient {
         position: fixed;
         height  : 100%;
         width   : 100%;
         z-index : 10;
         top     : 0;
         left    : 0;
         background-image: url(/images/gradient.svg);
         background-repeat: no-repeat;
         background-size: cover;
      }
   }

   .c-imagehero__overlay {
      position : absolute;
      bottom   : 100px;
      max-width: 840px;
      z-index  : 15;

      body.has-mobile-menu & {
         opacity: 0;
      }

      @include tablet {
         max-width: 75%;
         bottom   : 50px;
      }

      @include mobile {
         max-width: 500px;
         width    : calc( 100% - 20px );
         left     : 10px;
         bottom   : 50px;
      }
   }

   div.h1 {
      font-size     : $h1-font-size;
      color         : #fff;
      margin-bottom : 50px;
      letter-spacing: 0.7px;

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
</style>
