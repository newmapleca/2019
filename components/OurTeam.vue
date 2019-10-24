<template>
   <div>
      <div class="anchor"><a name="leadership" id="leadership"> </a></div>
      <div class="anchor"><a name="technical"  id="technical"> </a></div>
      <div class="anchor"><a name="advisors"   id="advisors"> </a></div>
      <section class="c-team">

         <div class="l-container">
            <nav class="c-team__nav">
               <h3>Our Team</h3>

               <ul class="h-horizontal">
                  <li><nuxt-link :to="{ path: '/', hash:'leadership' }" @click.native="changeActive('leadership')" :class="activeTeamTab == 'leadership' ? 'active' : ''">Leadership Team</nuxt-link></li>
                  <li><nuxt-link :to="{ path: '/', hash:'technical'  }" @click.native="changeActive('technical')"  :class="activeTeamTab == 'technical'  ? 'active' : ''">Technical Team</nuxt-link></li>
                  <li><nuxt-link :to="{ path: '/', hash:'advisors'   }" @click.native="changeActive('advisors')"   :class="activeTeamTab == 'advisors'   ? 'active' : ''">Advisors</nuxt-link></li>
               </ul>
            </nav>
         </div>

         <div class="c-team__content">
            <keep-alive>
               <Carousel v-if="activeTeamTab == 'leadership'" :people="content.leadershipTeam"></Carousel>
            </keep-alive>
            <keep-alive><Technical  v-if="activeTeamTab == 'technical'"  :content="content"></Technical></keep-alive>
            <keep-alive>
               <Carousel v-if="activeTeamTab == 'advisors'" :people="content.advisoryBoard"></Carousel>
            </keep-alive>
         </div>
      </section>
   </div>
</template>


<script>
   import { mapState } from "vuex";

   import Carousel  from '~/components/OurTeam/HeadshotCarousel.vue'
   import Technical from '~/components/OurTeam/Technical.vue'

   export default {
      computed: {
         ...mapState(["activeTeamTab"])
      },

      methods : {
         changeActive( tab ) {
            this.$store.commit('updateTeamTab', tab);
         }
      },

      components: {
         Carousel, Technical
      },

      props: [
         "content"
      ],
   }
</script>


<style lang="scss" scoped>

   section.c-team {
      border-top: 1px solid #d6d6d6;
      padding   : 40px 0 80px;

      @include mobile {
         padding-bottom: 0px;
      }
   }

   .c-team__nav {
      align-items  : center;
      margin-bottom: 60px;
      margin-top   : 20px;

      @include legacy-up {
         display      : flex;
      }

      @include mobile {
         display: block;
         margin-bottom: 25px;
      }

      h3 {
         color         : #000;
         font-size     : 50px;
         margin        : 0 0 20px 0;
         letter-spacing: -1px;
         line-height   : 55px;
         font-family   : 'Archivo Black', sans-serif;
         font-weight   : 400;
         text-transform: none;

         @include legacy-up {
            flex-grow    : 1;
            margin-bottom: 0;
         }
      }

      ul {
         @include mobile {
            display: flex;
         }

         li {
            margin-left: 48px;

            &:first-of-type {
               margin-left: 2px;
            }

            @include mobile {
               margin-top  : 15px;
               margin-left : 0px;
               margin-right: 0px;
               padding: 0 10px;
               text-align : center;
            }

            a {
               font-size      : 23px;
               line-height    : 28px;
               text-decoration: none;
               color          : #000;
               letter-spacing : 0.57px;

               @include mobile {
                  font-size  : 14px;
                  line-height: 18px;
               }

               &:hover {
                  color      : $color-primary;
               }

               &.active {
                  font-weight: bold;
                  color      : $color-primary;
               }
            }
         }
      }
   }

   .c-team__content {
      padding-top: 30px;
   }

</style>
