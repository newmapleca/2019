<template>
   <section class="c-introtext">
      <div class="l-container">
         <div class="c-introtext__wrapper">
            <div class="c-introtext__left">
               <h1>We are<br>New Maple.</h1>

               <div class="logo"></div>
            </div>

            <div class="c-introtext__right" v-html="content.aboutText"></div>
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

      props: [
         "content"
      ],
   }
</script>


<style lang="scss" scoped>

   section.c-introtext {

   }

   div.c-introtext__wrapper {
      padding        : 95px 0 0;
      display        : flex;
      overflow       : visible;
      justify-content: right;

      @include tablet-down {
         padding-top: 40px;
         flex-direction: column;
      }

      @include mobile {
         padding-top: 40px;
         display: block;
      }

      .c-introtext__left {
         flex          : 1;
         display       : flex;
         flex-direction: column;

         div.logo {
            margin-top         : 30px;
            flex-grow          : 1;
            background-image   : url(/images/bgs/logo.png);
            background-repeat  : no-repeat;
            background-position: left bottom;
            background-size    : contain;

            @include widescreen {
               margin-left: -250px;
            }

            @include desktop {
               margin-left: -180px;
            }

            @include legacy {
               margin-left: -175px;
            }

            @include tablet-down {
               margin : 0;
               display: none;
            }
         }
      }

      .c-introtext__right {
         flex          : 1;
         padding-bottom: 100px;
         max-width     : 700px;

         @include mobile {
            padding-bottom: 40px;
         }

         h2 {
            margin-top: 0;

            @include mobile {
               font-size  : 18px;
               line-height: 1.5em;
            }
         }
      }
   }

   h1 {
      margin   : 0;
      padding  : 0;
      font-size: $h1-font-size;
      color    : $color-primary;

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
