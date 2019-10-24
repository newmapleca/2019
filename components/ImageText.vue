<template>
   <section class="c-imagetext" :class="`c-imagetext--${align}`">
      <div class="c-imagetext__image" :style="`background-image:url(${img})`">&nbsp;</div>

      <div class="c-imagetext__text">
         <div class="c-imagetext__text-inner">
            <slot></slot>
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
         'align', 'img'
      ],
   }
</script>


<style lang="scss">

   section.c-imagetext {
      display       : flex;
      flex-direction: row;
      flex-wrap     : wrap;
      align-items   : center;

      @include mobile {
         flex-direction: column;
      }

      div.c-imagetext__image {
         flex               : 1;
         align-self         : stretch;
         width              : 50%;
         min-height         : 500px;
         background-size    : cover;
         background-repeat  : no-repeat;
         background-position: left center;

         @include mobile {
            max-width : 100%;
            width     : 100%;
            min-height: 220px;
         }

         @include small-mobile {
            min-height: 180px;
         }
      }

      div.c-imagetext__text {
         flex           : 1;
         width          : 50%;
         display        : flex;
         justify-content: right;
         padding        : 0;
         position       : relative;

         a {
            color: $color-primary;
            text-decoration: none;

            &:hover {
               color          : darken( $color-primary, 10% );
               text-decoration: underline;

            }
         }

         @include mobile {
            max-width: 500px;
            width    : 100%;
         }

         .c-imagetext__text-inner {

            div.first h4 {
               font-size: $h2-font-size - 5px;
               line-height: 40px;
               text-transform : none;
               margin-bottom : 15px;

               @include tablet {
                  font-size  : 22px;
                  line-height: 1.3em;
               }

               @include mobile {
                  font-size  : 20px;
                  line-height: 1.3em;
               }
            }

            h3 {
               margin-bottom: 20px;
            }

            h4 {
               @include tablet-down {
                  margin-bottom: 20px;
               }
            }

            p {
               &:last-of-type {
                  margin-bottom : 0;
               }
            }

            @include tablet-down {
               padding-top   : 40px;
               padding-bottom: 40px;
            }

            @include desktop-up {
               max-width: 565px;
            }

            @include legacy {
               max-width: 425px;
            }

            @include tablet {
               max-width: 339px;
            }

            @include mobile {
               max-width: 100%;
               width    : 100%;
               padding  : 40px 12px 60px;
            }
         }
      }

      &.c-imagetext--right {
         flex-direction: row-reverse;

         @include mobile {
            flex-direction: column-reverse;
         }

         .c-imagetext__image {
            background-position: right center;
         }

         .c-imagetext__text-inner {
            margin-left  : auto;

            @include widescreen {
               padding-right: 185px;
            }

            @include desktop {
               padding-right: 50px;
            }

            @include legacy {
               padding-right: 50px;
            }

            @include tablet {
               padding-right: 35px;
            }

            @include mobile {
               padding: 0px 12px;
            }
         }
      }

      &.c-imagetext--left {

         @include mobile {
            flex-direction: column-reverse;
         }

         div.c-imagetext__text {
            @include mobile {
               margin-left: auto;
               margin-right: auto;
            }
         }

         .c-imagetext__text-inner {
            margin-right: auto;

            @include widescreen {
               padding-left: 185px;
            }

            @include desktop {
               padding-left: 50px;
            }

            @include legacy {
               padding-left: 50px;
            }

            @include tablet {
               padding-left: 35px;
            }

            @include mobile {
               padding: 0px 12px;
            }
         }
      }
   }
</style>
