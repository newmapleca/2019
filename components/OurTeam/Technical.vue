<template>
   <section class="c-technical">
      <div class="l-container">
         <div class="c-technical__wrapper">
            <div class="c-technical__img">
               <img :src="content.technicalTeamImage.url">
            </div>

            <div class="c-technical__text" v-html="content.technicalTeamIntro"></div>

            <div class="c-technical__awards">
               <div class="c-award" v-for="icon in content.technicalTeamIcons" :key="icon.id">
                  <div class="c-award__icon"><img :src="icon.svg.url"></div>
                  <div class="c-award__text" v-html="addSup(icon.text)"></div>
               </div>
            </div>

            <div class="c-technical__footnotes" v-html="content.technicalTeamFootnotes"></div>
         </div>
      </div>
   </section>
</template>


<script>
   export default {
      methods: {
         addSup : function(value) {
            return value.replace(/\[(\d+)\]/, function (match, p1, offset, string) {
               return "<sup>" + p1 + "</sup>";
            })
         }
      },
      props: [
         "content"
      ],
   }
</script>


<style lang="scss">

   section.c-technical {

      .c-technical__wrapper {
         display  : flex;
         flex-wrap: wrap;
      }

      @include mobile {
         display: block;
      }

      .c-technical__img {
         width           : 57%;
         flex            : 1;

         img {
            max-width : 100%;
         }

         @include mobile {
            width: 100%;
            min-height: 200px;
         }
      }

      .c-technical__text {
         width  : 43%;
         padding: 20px 50px;

         @include mobile {
            width  : 100%;
            padding: 20px 0;
         }

         h3 {
            color         : $color-primary;
            font-size     : $h1-font-size;
            line-height   : 76px;
            letter-spacing: 0.7px;
            margin-bottom : 20px;
            font-family   : 'Archivo Black', sans-serif;
            text-transform: none;
            font-weight   : normal;

            @include legacy {
               font-size    : 54px;
               line-height  : 1.2em;
            }

            @include tablet {
               font-size    : 35px;
               line-height  : 1.2em;
            }

            @include mobile {
               font-size    : 35px;
               line-height  : 1.2em;
            }
         }
      }

      .c-technical__awards {
         display   : flex;
         width     : 100%;
         margin-top: 40px;

         @include tablet-down {
            flex-wrap : wrap;
         }
      }

      .c-technical__footnotes {
         width     : 100%;
         margin-top: 40px;
         font-size : 14px;
         color     : #BFBFBF;
         line-height: 18px;

         ul {
            padding-left: 13px;
         }
      }

      .c-award {
         flex        : 1;
         margin      : 0;
         text-align  : center;
         min-width   : 160px;
         margin      : 0 10px;
         padding     : 10px 20px;

         @include desktop-up {
            margin      : 0;
            padding     : 0px 25px;
            border-right: 1px solid #BFBFBF;
         }

         &:last-of-type {
            border-right: none;
         }

         @include legacy {
            padding   : 10px 5px;
         }

         @include tablet {
            margin-bottom: 30px;
         }

         @include mobile {
            margin-bottom: 30px;
            padding      : 10px 5px;
         }

         .c-award__text {
            font-size  : 18px;
            padding    : 0;
            font-weight: 500;
            max-width  : 280px;
            margin     : 0 auto;

            @include desktop-up {
               font-size: 22px;
            }

            sup {
               font-size: 11px;
               margin-left: 2px;
            }
         }

         .c-award__icon {
            height         : 80px;
            width          : 80px;
            margin         : 0 auto 20px auto;
            display        : flex;
            justify-content: center;
            align          : center;

            img {
               max-width : 80px;
               max-height: 80px;
            }
         }
      }
   }



</style>
