<template>
   <div class="c-location__detail">
      <div class="c-location__detail__title">
         <div class="l-container l-container--relative">
            <h4>
               {{location.title}}
               <em>|</em>
               <span>{{location.location}}</span>
            </h4>

            <button class="c-location__detail__close" @click.prevent="hide"><span class="close hairline"></span></button>
         </div>
      </div>

      <div class="c-location__detail__image" :class="location.image2 ? 'two' : ''">
         <div class="image"><img :src="location.image1.url"></div>
         <div class="image" v-if="location.image2"><img :src="location.image2.url"></div>
      </div>

      <div class="l-container">
         <div class="c-location__detail__summary">
            <div class="c-location__detail__bullets">
               <div v-html="wrapBulletsInSpan( location.bulletPoints )"></div>

               <a class="c-location__detail__url" :href="location.externalUrl" target="_blank">{{cleanLinkUrl( location.externalUrl )}}</a>

               <a class="c-location__detail__url" :href="location.extraLinkUrl" target="_blank" v-if="location.extraLinkUrl">{{ location.extraLinkLabel ? location.extraLinkLabel : cleanLinkUrl( location.extraLinkUrl )}}</a>

            </div>

            <div class="c-location__detail__text" v-html="location.description"></div>
         </div>
      </div>
   </div>
</template>


<script>
   export default {
      data() {
         return {

         }
      },

      methods: {
         wrapBulletsInSpan( html ) {
            html = html.replace( /<li>/g, "<li><span>", html )
            html = html.replace( /<\/li>/g, "</span></li>", html )
            return html;
         },

         hide : function() {
            this.$emit('hide')
         },

         cleanLinkUrl : function(link) {
            link = link.replace( 'http://', '' );
            link = link.replace( 'https://', '' );
            link = link.replace( 'www.', '' );
            return link;
         }
      },

      props: [ 'location' ]
   }
</script>


<style lang="scss">
   .c-location__detail {
      position          : relative;
      margin-top        : 60px;
      padding-top       : 30px;
      margin-bottom     : -25px;
      -webkit-box-shadow: 0px 0px 3px 3px rgba(0,0,0,0.2);
      -moz-box-shadow   : 0px 0px 3px 3px rgba(0,0,0,0.2);
      box-shadow        : 0px 0px 3px 3px rgba(0,0,0,0.2);

      @include mobile {
         padding-top: 10px;

      }

      .c-location__detail__title {
         margin: 10px 0 40px;

         @include mobile {
            margin-bottom: 20px;
         }

         h4 {
            font-size: 30px;

            @include mobile {
               font-size: 20px;
            }

            span {
               text-transform: none;
               font-size     : 24px;
               display       : inline-block;

               @include mobile {
                  display   : block;
                  margin-top: 5px;
                  font-size : 16px;
               }
            }

            em {
               font-style: normal;
               display   : inline-block;
               margin    : 0 10px;
               font-size : 24px;

               @include mobile {
                  display: none;
               }
            }
         }
      }

      .c-location__detail__image {
         display: flex;

         @include mobile {
            flex-direction: column;
            max-width: 500px;
            margin: 0 auto;
         }

         div {
            @include mobile {
               margin-bottom: 10px;
               overflow     : hidden;

            }
         }

         img {
            max-width: 100%;

            @include mobile {
               width : 100%;
               max-width: 500px;
               height         : 200px;
               object-fit     : cover;
               object-position: 50% 50%;
            }
         }
      }

      .c-location__detail__summary {
         display   : flex;
         margin-top: 30px;
         padding   : 30px 20px 20px;

         @include tablet {
            padding   : 30px 0px 20px;
         }

         @include mobile {
            flex-direction: column;
            margin-top    : 0;
            padding       : 0px 0px 20px;
         }

         .c-location__detail__bullets {
            flex      : 1;
            min-width : 335px;
            border-top: 2px solid $color-primary;
            font-size : 18px;

            @include tablet {
               min-width : 300px;
            }

            @include mobile {
               min-width: 100%;
               border-top: 0;
            }

            ul {
               padding-top  : 20px;
               padding-left : 22px;
               margin-bottom: 30px;
            }

            li {
               margin-bottom: 20px;
               color        : $color-primary;

               strong {
                  display: block;
                  text-transform: uppercase;
                  color: #000;
               }

               span {
                  color: #000;
               }
            }

            a {
               font-size: 16px;
            }
         }

         .c-location__detail__url {
            font-weight    : 700;
            color          : $color-primary;
            text-decoration: none;
            display        : block;
            margin-bottom  : 10px;

            &:hover {
               text-decoration: underline;
            }
         }

         .c-location__detail__text {
            flex-grow   : 1;
            padding-left: 100px;

            @include tablet {
               padding-left: 50px;
            }

            @include mobile {
               padding-left: 0px;
               padding-top: 40px;
            }

            h5 {
               font-size    : 30px;
               margin-bottom: 15px;
               margin-top   : -10px;
               color        : $color-primary;
            }

            p {
               font-size: 18px;

               @include tablet {
                  font-size: 16px;
               }

               @include mobile {
                  font-size: 14px;
               }
            }

            ul {
               margin-left : 0;
               padding-left: 22px;
            }

            li {
               font-size    : 18px;
               font-weight  : 700;
               margin-bottom: 18px;

               @include tablet {
                  font-size: 16px;
                  margin-bottom: 16px;
               }

               @include mobile {
                  font-size: 14px;
                  margin-bottom: 14px;
               }
            }
         }
      }

      .c-location__detail__close {
         position  : absolute;
         top       : 0;
         right     : 0;
         min-width : 50px;
         border    : 0;
         padding   : 5px 0 0;
         align-self: flex-start;
         text-align: right;

         &:hover {
            background: transparent;
            color     : $color-primary;
         }

         @include small-mobile {
            display: none;
         }
      }
   }
</style>
