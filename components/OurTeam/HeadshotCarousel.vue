<template>
   <section class="c-leadership">
      <div class="l-container">
         <div class="l-carousel">
            <button @click="prev" class="l-carousel__prev"><span class="arrow-left"></span></button>
            <button @click="next" class="l-carousel__next"><span class="arrow-right"></span></button>

            <transition-group name="l-carousel__item" tag="div" class="l-carousel__container">
               <div class="l-carousel__item" v-for="item in items" :key="item.id" :data-id="`${item.id}`" :class="item.moving ? 'transit' : ''">
                  <div class="c-headshot" @click.prevent="showBio(item.id)" :class="item.id == activeBioId ? 'is-active' : ''">
                     <div class="c-headshot__image"><img :src="item.headshot ? item.headshot.url : '/images/headshots/blank.jpg'" /></div>

                     <div class="c-headshot__name">
                        <strong>{{item.name}}</strong>
                        <span class="position">{{item.jobTitle}}</span>
                     </div>
                  </div>
               </div>
            </transition-group>
         </div>
      </div>

      <div class="c-headshot__bios">
         <div class="c-headshot__bio" v-for="item in items" :key="item.id" :data-id="`${item.id}`" v-if="item.id == activeBioId">
            <div class="l-container l-container--mobile-fullbleed">
               <div class="c-bio">
                  <div class="c-bio__meta">
                     <strong class="name">{{item.name}}</strong>
                     <span class="position">{{item.jobTitle}}</span>

                     <span class="social">
                        <a :href="item.facebookUrl"  v-if="item.facebookUrl"><img src="/images/icons/facebook.svg"></a>
                        <a :href="item.twitterUrl"   v-if="item.twitterUrl"><img src="/images/icons/twitter.svg"></a>
                        <a :href="item.linkedinUrl"  v-if="item.linkedinUrl"><img src="/images/icons/linkedin.svg"></a>
                        <a :href="item.instagramUrl" v-if="item.instagramUrl"><img src="/images/icons/instagram.svg"></a>
                     </span>
                  </div>

                  <div v-html="item.bio" class="c-bio__text"></div>

                  <button class="c-bio__close" @click.prevent="hideBio"><span class="close hairline"></span></button>
               </div>
            </div>
         </div>
      </div>
   </section>
</template>


<script>
   export default {
      data() {
         return {
            activeBioId: null,
            items      : []
         }
      },

      mounted: function() {

         this.items = this.people;

         // move backwards by 2 so we're starting with the first item
         this.items.splice(0, 0, this.items.pop() )
         this.items.splice(0, 0, this.items.pop() )

         // if we have less than 6 items in the array, double it so we have extras on each side
         if( this.items.length <= 6 ) {
            let length = this.items.length;
            for( let i = 0; i < length; i++ ) {
               this.items.push({
                  id      : this.items[i].id + 6,
                  image   : this.items[i].image,
                  name    : this.items[i].name,
                  jobTitle: this.items[i].jobTitle,
                  bio     : this.items[i].bio,
                  headshot: this.items[i].headshot,
               })
            }
         }
      },

      methods: {

         showBio : function(id) {
            this.activeBioId = id
         },

         hideBio : function() {
            this.activeBioId = null
         },

         prev: function () {
            this.items[0].moving = false
            this.items[this.items.length-1].moving = true
            var last = this.items.pop()
            this.items.splice(0, 0, last)

            if( this.activeBioId ) {
               this.activeBioId = this.items[2].id;
            }
         },

         next: function () {
            this.items[this.items.length-1].moving = false
            this.items[0].moving = true
            var first = this.items.shift()
            this.items.push(first)

            if( this.activeBioId ) {
               this.activeBioId = this.items[2].id;
            }
         },
      },

      computed: {

      },

      props: [ 'people' ],
   }
</script>


<style lang="scss" scoped>

   .l-carousel {
      position: relative;
      z-index : 20;

      button {
         position : absolute;
         top      : 111px;
         padding  : 0;
         border   : 0;
         z-index  : 10;

         @include desktop {
            top: 78px;
         }

         @include legacy {
            top: 73px;
         }

         @include tablet {
            top: 83px;
         }

         @include mobile {
            top: 30%
         }

         &.l-carousel__prev {
            left     : 0;

            @include legacy {
               left: -10px;
            }

            &:focus {
               outline: none;

               span {
                  border-color: $color-primary;
               }
            }
         }

         &.l-carousel__next {
            right    : 0;

            @include legacy {
               right: -10px;
            }

            &:focus {
               outline: none;

               span {
                  border-color: $color-primary;
               }
            }
         }

         &:hover {
            color     : $color-primary;
            background: transparent;
         }
      }
   }

   .l-carousel__container {
      display        : block;
      overflow       : hidden;
      line-height    : 1em;
      display        : flex;
      justify-content: left;
      padding-bottom : 80px;

      @include tablet {
         min-width: 748px;
         overflow: hidden;
      }
   }

   .arrow-left {
      display      : inline-block;
      border-right : 1.5px solid black;
      border-bottom: 1.5px solid black;
      width        : 30px; height: 30px;
      transform    : rotate(135deg) skew(-10deg, -10deg);

      @include tablet {
         width : 20px;
         height: 20px;
      }

      &:hover {
         border-color: $color-primary;
      }
   }

   .arrow-right {
      display      : inline-block;
      border-right : 1.5px solid black;
      border-bottom: 1.5px solid black;
      width        : 30px; height: 30px;
      transform    : rotate(-45deg) skew(-10deg, -10deg);

      @include tablet {
         width : 20px;
         height: 20px;
      }

      &:hover {
         border-color: $color-primary;
      }

      &:focus {
         outline: none;
      }
   }

   .l-carousel__item {
      transition : all 0.4s linear, opacity 0s;
      flex       : 1;
      position   : relative;
      z-index    : 2;
      line-height: 1em;
      opacity    : 1;

      @include widescreen {
         max-width  : calc( 1500px / 4 ) !important;
         min-width  : calc( 1500px / 4 ) !important;
      }

      @include desktop {
         max-width  : calc( 1230px / 4 ) !important;
         min-width  : calc( 1230px / 4 ) !important;
      }

      @include legacy {
         max-width  : calc( 950px / 4 ) !important;
         min-width  : calc( 950px / 4 ) !important;
      }

      @include tablet {
         max-width  : calc( 748px / 3 ) !important;
         min-width  : calc( 748px / 3 ) !important;
      }

      @include mobile {
         max-width  : 100% !important;
         min-width  : 100% !important;
      }

      &:first-child {
         margin-left: -50%;

         @include tablet {
            margin-left: -66.666%;
         }

         @include mobile {
            margin-left: -200%;
         }
      }

      &.transit {
         opacity : 0;
      }
   }


   div.c-headshot {
      margin  : 0 60px;
      cursor  : pointer;
      position: relative;
      height : 100%;

      @include legacy {
         margin  : 0 30px;
      }

      @include tablet {
         margin  : 0 30px;
      }

      @include mobile {
         margin  : 0 30px;
      }

      &:hover, &.is-active {
         div.c-headshot__image {
            img {
               -webkit-filter: grayscale(0%);
               filter        : grayscale(0%);
            }

            &:before {
               background-image : url(/images/bgs/headshot-frame--active.png);
            }
         }

         div.c-headshot__name {
            strong {
               color: $color-primary;
            }
         }
      }

      &.is-active {
         &:after {
            content     : '';
            display     : block;
            bottom      : -80px;
            position    : absolute;
            left        : 50%;
            z-index     : 20;
            width       : 0;
            height      : 0;
            border-style: solid;
            border-width: 30px 0 0 45px;
            border-color: transparent transparent transparent #eb2f22;
         }

         &:before {
            content     : '';
            display     : block;
            bottom      : -84px;
            position    : absolute;
            left        : 50%;
            margin-left : 2px;
            z-index     : 22;
            width       : 0;
            height      : 0;
            border-style: solid;
            border-width: 30px 0 0 45px;
            border-color: transparent transparent transparent #fff;
         }
      }

      div.c-headshot__image {
         overflow  : hidden;
         text-align: center;
         position  : relative;

         &:before {
            content          : '';
            display          : block;
            position         : absolute;
            top              : 0;
            left             : 0;
            height           : 100%;
            width            : 100%;
            background-image : url(/images/bgs/headshot-frame.png);
            background-repeat: no-repeat;
            background-size  : cover;
            z-index          : 10;

         }

         img {
            width         : 100%;
            height        : 100%;
            display       : block;
            line-height   : 1em;
            margin        : 0;
            padding       : 0;
            -webkit-filter: grayscale(100%);
            filter        : grayscale(100%);
         }
      }

      div.c-headshot__name {
         margin-top: 25px;

         strong {
            display    : block;
            font-size  : 26px;
            line-height: 1.05em;
         }

         span.position  {
            font-size     : 16px;
            text-transform: uppercase;
            display       : block;
            margin-top    : 10px;
            line-height   : 1.2em;
         }
      }
   }

   .c-headshot__bios {
      padding-top: 50px;
      border-top : 2px solid $color-primary;
      margin-top : -2px;
      position   : relative;
      z-index    : 5;

      @include mobile {
         padding-top   : 20px;
         padding-bottom: 10px;

         -webkit-box-shadow: 0px 4px 3px 3px rgba(0,0,0,0.2);
         -moz-box-shadow   : 0px 4px 3px 3px rgba(0,0,0,0.2);
         box-shadow        : 0px 4px 3px 3px rgba(0,0,0,0.2);
      }

      &:empty {
         margin-top : 0px;
         padding-top: 0px;
         border-top : 0px;
      }
   }


   div.c-bio {
      display    : flex;

      @include mobile {
         display  : block;
         margin   : 0 auto;
      }

      .c-bio__meta {
         min-width    : 30%;
         padding-right: 30px;

         .name {
            color         : $color-primary;
            font-size     : 50px;
            line-height   : 50px;
            letter-spacing: 0.6px;
            margin-bottom : 15px;
            display       : block;

            @include mobile {
               font-size    : 35px;
               margin-bottom: 0px;
               line-height  : 1.2em;
            }
         }

         .position {
            color         : #000;
            font-size     : 31px;
            line-height   : 1em;
            text-transform: uppercase;
            letter-spacing: 1.25px;
            margin-top    : 25px;
            margin-bottom : 15px;
            display       : block;

            @include mobile {
               margin : 15px 0;
               font-size: 20px;
            }
         }

         .social {
            font-size     : 31px;
            line-height   : 62px;
            letter-spacing: 1.55px;
            font-weight   : bold;
            display       : block;

            @include mobile {
               line-height   : 40px;
               margin-bottom: 10px;
            }

            a {
               color          : #000;
               text-decoration: none;
               display        : inline-block;
               margin-right   : 10px;
            }
         }

      }

      .c-bio__text {
         flex-grow    : 1;
         padding-right: 50px;

         @include mobile {
            padding-right: 0;
         }
      }

      .c-bio__close {
         min-width : 50px;
         border    : 0;
         padding   : 5px 0 0;
         align-self: flex-start;
         text-align: right;

         &:hover {
            background: transparent;
            color     : $color-primary;
         }

         @include mobile {
            display: none;
         }
      }
   }

</style>
