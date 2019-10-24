<template>
   <div id="top">
      <Header></Header>
      <nuxt />
      <Footer></Footer>
   </div>
</template>


<script>
   import Header     from '~/components/Header.vue'
   import Footer     from '~/components/Footer.vue'

   export default {
      transition: "default",

      components: {
         Header, Footer
      }
   }
</script>


<style lang="scss">
   body, html {
      background   : #fff;
      height       : 100vh;
      min-height   : 100vh;
      margin       : 0;
      font-family  : Lato, sans-serif;
   }

   body.has-sticky-menu {
      padding-top: 95px;
   }

   body.has-mobile-menu {
      overflow: hidden;
      height  : 100%;
      width   : 100%;
   }

   main.l-main {
      div.l-content {
         background:#fff;
         position  : relative;
         z-index   : 10;
      }
   }

   .page-enter-active,
   .page-leave-active {
      transition-property       : opacity;
      transition-timing-function: ease-in-out;
      transition-duration       : 300ms;
   }
   .page-enter,
   .page-leave-to {
      opacity: 0;
   }

   .l-container {
      margin: 0 auto;
      width : 100%;

      @include widescreen {
         max-width: 1500px;
      }

      @include desktop {
         max-width: 1230px;
      }

      @include legacy {
         max-width: 950px;
      }

      @include tablet {
         max-width: 748px;
      }

      @include mobile {
         max-width: 500px;
         min-width: 300px;
         width    : calc( 100% - 20px );
      }

      &.l-container--relative {
         position : relative;
      }

      &.l-container--flex {
         display: flex;
      }

      &.l-container--legacy-full {
         @include legacy {
            max-width: calc( 100% - 30px );
            margin   : 0 15px;
         }
      }
   }

   h1,
   div.h1,
   h3,
   a.button,
   button {
      font-family: 'Archivo Black', sans-serif;
   }

   p {
      margin-top: 0;
   }


   ul.h-plain {
      margin    : 0;
      padding   : 0;
      list-style: none;

      li {
         margin : 0;
         padding: 0;
      }
   }

   ul.h-horizontal {
      margin    : 0;
      padding   : 0;
      list-style: none;

      li {
         margin : 0;
         padding: 0;
         display: inline-block;
      }
   }


   h1 {
      font-size  : $h1-font-size;
      font-weight: normal;
      line-height: 80px;
   }

   div.h1 {
      font-size  : $h1-font-size;
      font-weight: normal;
      line-height: 80px;
   }

   h2 {
      font-size: $h2-font-size;
      line-height: 45px;
   }

   div.h2 {
      font-size: $h2-font-size - 5px;
      line-height: 45px;
   }

   h3 {
      font-size     : $h3-font-size;
      margin        : 0;
      font-weight   : normal;
      letter-spacing: -1px;
      line-height   : 55px;

      @include mobile {
         font-size    : 35px;
         margin-bottom: 30px;
         line-height  : 1.2em;
      }
   }

   h4 {
      font-size     : $h4-font-size;
      margin        : 0;
      text-transform: uppercase;
   }

   p {
      font-size: 20px;
      line-height: 1.6em;
      margin-bottom: 32px;

      @include tablet {
         font-size    : 16px;
         margin-bottom: 20px;
      }

      @include mobile {
         font-size: 14px;
         margin-bottom: 18px;
      }

      &.lead {
         font-size: 120%;
      }
   }

   a.button,
   button {
      cursor        : pointer;
      display       : inline-block;
      background    : transparent;
      color         : #000;
      border        : 2px solid #000;
      text-transform: uppercase;
      font-size     : 20px;
      font-weight   : normal;
      padding       : 15px 35px;
      letter-spacing: 1.5px;

      text-decoration: none;

      &.is-white {
         border: 2px solid #fff;
         color : #fff;

         &:active,
         &:hover {
            background-color: #fff;
            color           : $color-primary;
         }
      }

      &:active,
      &:hover {
         color           : #fff;
         background-color: $color-primary;
         border-color    : transparent;
      }
   }


   .anchor {
      position : relative;

      a {
         position: absolute;
         left    : 0px;
         top     : -95px;
      }
   }



   .sr-only {
      position: absolute;
      width   : 1px; height: 1px;
      padding : 0; margin: -1px;
      overflow: hidden;
      clip    : rect(0,0,0,0);
      border  : 0;
   }



   .close{
     position: relative;
     display: inline-block;
     width: 32px;
     height: 32px;
     overflow: hidden;

     &:hover {
       &::before, &::after {
         background: $color-primary;
       }
     }

     &::before, &::after {
       content: '';
       position: absolute;
       height: 2px;
       width: 100%;
       top: 50%;
       left: 0;
       margin-top: -1px;
       background: #BFBFBF;
     }
     &::before {
       transform: rotate(45deg);
     }
     &::after {
       transform: rotate(-45deg);
     }
     &.big {
       transform : scale(3);
     }
     &.hairline {
       &::before, &::after {
         height: 3px;
       }
     }
     &.thick {
       &::before, &::after {
         height: 4px;
         margin-top: -2px;
       }
     }
     &.black {
       &::before, &::after {
         height: 8px;
         margin-top: -4px;
       }
     }
     &.heavy {
       &::before, &::after {
         height: 12px;
         margin-top: -6px;
       }
     }
     &.pointy {
       &::Before, &::after {
         width: 200%;
         left: -50%;
       }
     }
     &.rounded {
       &::before, &::after {
         border-radius: 5px;
       }
     }
     &.blades {
       &::before, &::after {
         border-radius: 5px 0;
       }
     }
     &.warp {
       &::before, &::after {
         border-radius: 120% 0;
       }
     }
     &.fat {
       &::before, &::after {
         border-radius: 100%;
       }
     }
   }

</style>
