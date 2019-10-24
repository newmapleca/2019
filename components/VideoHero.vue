<template>
   <section class="c-videohero c-pagehero">
      <div class="gradient"></div>

      <div class="video-container">
         <video playsinline autoplay muted loop poster="/videos/background.jpg" id="bgvid" data-object-fit="cover">
            <source src="/videos/background.mp4" type="video/mp4">
         </video>
      </div>

      <div class="l-container">
         <div class="c-videohero__overlay">
            <div class="h1">Cultivating joy, relief and peace in people everywhere</div>
            <button class="is-white" @click="scrollToAbout">Learn More</button>
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

      methods: {
         scrollToAbout() {
            let element = document.querySelector('#about');
            let rect = element.getBoundingClientRect();

            window.scrollTo({
               'behavior': 'smooth',
               'left'    : 0,
               'top'     : document.documentElement.scrollTop + rect.top
            });
         }
      },

      computed: {

      },

      props: [],
   }
</script>


<style lang="scss" scoped>
   section.c-videohero {
      margin-top      : -110px;
      background-color: coral;
      height          : 100vh;
      min-height      : 700px;
      position        : relative;

      .video-container {
         width   : 100%;
         height  : 100%;
         position: fixed;
         width   : 100%;
         top     : 0;
         left    : 0;
         z-index : 5;
         overflow: hidden;
      }

      video {
        width      : 100%;
        height     : 100%;
        object-fit : cover;
        font-family: 'object-fit: cover;';
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

   .c-videohero__overlay {
      position : absolute;
      bottom   : 100px;
      max-width: 840px;
      z-index  : 15;

      @include tablet {
         max-width: 75%;
         bottom   : 50px;
      }

      @include mobile {
         max-width: 500px;
         width    : calc( 100% - 20px );
         left     : 10px;
         bottom   : 75px;
      }

      body.has-mobile-menu & {
         opacity: 0;
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
