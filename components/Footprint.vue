<template>
   <section class="c-footprint" :class="activeFootprintTab ? 'has-details' : ''">
      <div class="c-footprint__map">
         <div class="l-container">
            <h3>Footprint</h3>
         </div>
      </div>

      <div class="l-container">
         <div class="c-footprint__locations" :class="activeFootprintTab ? 'is-active' : ''">
            <div class="c-location" v-for="item in content.footprintLocations" :key="item.id" @click.prevent="showLocation(item.anchor)" :class="item.anchor == activeFootprintTab ? 'is-active' : ''">
               <div class="anchor"><a :name="item.anchor" :id="item.anchor"> </a></div>
               <div class="c-location__shadow">
                  <div class="c-location__box">
                     <div class="c-location__logo"><img :src="item.logo.url" v-if="item.logo" :alt="item.title"></div>

                     <div class="c-location__bullets" v-html="item.bulletPoints"></div>

                     <a href="#" class="c-location__more c-location__more--less" @click.prevent="" v-if="item.anchor == activeFootprintTab"><span class="arrow-down"></span></a>
                     <a href="#" class="c-location__more" @click.prevent="" v-else><span class="arrow-down"></span></a>
                  </div>
               </div>

               <div class="c-location__extra" :class="(item.anchor == activeFootprintTab) ? 'isActive' : '' ">
                  <LocationDetail :location="item" @hide="hideLocation"></LocationDetail>
               </div>
            </div>
         </div>
      </div>

      <div class="c-location__details">
         <LocationDetail :location="item" v-for="item in content.footprintLocations" :key="item.id" :data-id="`${item.anchor}`" v-if="item.anchor == activeFootprintTab" @hide="hideLocation"></LocationDetail>
      </div>
   </section>
</template>


<script>
   import { mapState } from "vuex";
   import LocationDetail from '~/components/Footprint/LocationDetail.vue'

   export default {
      data() {
         return {

         }
      },

      methods: {

         showLocation : function(id) {
            if( this.activeFootprintTab == id ) {
               this.$store.commit('updateFootprintTab', null);
            } else {
               this.$store.commit('updateFootprintTab', id);
            }
         },

         hideLocation : function() {
            this.$store.commit('updateFootprintTab', null);

            let element = document.querySelector('.c-footprint__locations');
            if( element ) {
               let rect = element.getBoundingClientRect();

               window.scrollTo({
                  'behavior': 'smooth',
                  'left'    : 0,
                  'top'     : document.documentElement.scrollTop + rect.top - 150
               });
            }
         },
      },

      computed: {
         ...mapState(["activeFootprintTab"])
      },

      components: {
         LocationDetail
      },

      props: [ "content" ]
   }
</script>


<style lang="scss" scoped>

   .c-footprint {
      padding-bottom: 25px;
      border-bottom : 1px solid #d6d6d6;

      &.has-details {
         border-bottom : none;
      }
   }

   .c-footprint__map {
      height             : 600px;
      position           : relative;
      background-image   : url(/images/footprint/map-new.jpg);
      background-repeat  : no-repeat;
      background-position: center center;
      background-size    : cover;

      @include tablet {
         height : 400px;
      }

      @include mobile {
         height : 300px;
      }

      h3 {
         margin     : 0;
         padding-top: 42px;
      }
   }

   .c-footprint__locations {
      display        : flex;
      justify-content: space-between;
      position       : relative;
      z-index        : 2;
      margin         : -50px 25px 0px;

      @include tablet {
         margin: -50px 0px 0px;
      }

      @include mobile {
         margin : -50px 5px 0px;
      }

      &.is-active {
         .c-location {
            transform: scale(0.8);

            .c-location__logo,
            .c-location__more,
            ul {
               opacity  : 0.6;
            }

            .c-location__shadow {
               transform: scale(0.95);
            }
         }
      }
   }

   .c-location {
      max-width : 30%;
      flex-grow : 1;
      cursor    : pointer;
      transition: all 0.3s ease-in-out;

      @include mobile {
         max-width : 32%;
      }

      &.is-active {
         transform: scale(1.1) !important;

         .c-location__logo,
         .c-location__more,
         ul {
            opacity  : 1 !important;
         }

         .c-location__shadow {
            transform: scale(1) !important;
         }
      }

      .anchor {
         top : -30px;
      }

      .c-location__shadow {
         filter    : drop-shadow(0px 3px 3px rgba(0, 0, 0, 0.25));
         height    : 100%;
         transition: all 0.45s ease-in-out;
      }

      .c-location__box {
         background: #fff;
         padding   : 20px 25px 60px;
         height    : calc( 100% - 80px );
         position  : relative;

         clip-path:
            polygon(
               0% 0%,                /* top left */
               0% 0%,                /* top left */
               calc(100% - 30px) 0%, /* top right */
               100% 30px,            /* top right */
               100% 100%,            /* bottom right */
               100% 100%,            /* bottom right */
               30px 100%,            /* bottom left */
               0 calc(100% - 30px)   /* bottom left */
            );

         @include mobile {
            padding   : 10px 10px 35px;
            height    : calc( 100% - 50px );

            clip-path:
               polygon(
                  0% 0%,                /* top left */
                  0% 0%,                /* top left */
                  calc(100% - 15px) 0%, /* top right */
                  100% 15px,            /* top right */
                  100% 100%,            /* bottom right */
                  100% 100%,            /* bottom right */
                  15px 100%,            /* bottom left */
                  0 calc(100% - 15px)   /* bottom left */
               );
         }

         div.c-location__bullets /deep/ ul {
               margin: 0 0 0 15px;
               padding: 0;

               @include tablet-down {
                  display: none;
               }

               li {
                  margin   : 0 0 9px 0;
                  padding  : 0;
                  font-size: 16px;

                  strong {
                     font-weight   : normal;
                     text-transform: none;
                  }

                  &:last-of-type {
                     margin-bottom: 0;
                  }
               }
         }


         &:hover {
            .c-location__more {
               bottom: 17.5px;

               @include mobile {
                  bottom: 3px;
               }

               .arrow-down {
                  border-color: $color-primary;
               }
            }
         }
      }

      .c-location__logo {
         text-align     : center;
         height         : 80px;
         display        : flex;
         align-items    : center;
         justify-content: center;
         margin-bottom  : 18px;

         @include tablet-down {
            margin-bottom  : 0px;
         }

         @include mobile {
            height: 50px;
         }

         img {
            max-height: 100%;
            max-width : 100%;
         }
      }

      .c-location__more {
         position        : absolute;
         bottom          : 20px;
         text-align      : center;
         transform-origin: 50% 50%;
         text-decoration : none;
         left            : 50%;
         color           : #999;
         margin-left     : -10px;
         transition      : bottom 0.3s ease;

         @include mobile {
            bottom: 5px;
         }

         .arrow-down {
            display      : inline-block;
            border-right : 1.5px solid black;
            border-bottom: 1.5px solid black;
            width        : 15px; height: 15px;
            transform    : rotate(45deg) skew(-20deg, -20deg);
         }

         &.c-location__more--less {
            color : $color-primary;
            bottom: 10px !important;

            .arrow-down {
               border-color: $color-primary;
            }
         }
      }

      .c-location__extra {
         position : relative;
         display  : none;
      }
   }

   .c-location__details {
      margin-top : 30px;

      &:empty {
         border-top : 0;
         padding-top: 0px;
      }
   }

</style>
