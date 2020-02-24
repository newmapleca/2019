<template>
   <div>
      <div class="l-body">
         <main class="l-main">

            <VideoHero :content="content"></VideoHero>
            <div class="l-content">
               <div class="anchor"><a name="about" id="about"> </a></div>
               <IntroText v-waypoint="{ active: true, callback: onWaypoint, options: intersectionOptions }" data-waypoint="about" :content="content"></IntroText>

               <div class="anchor"><a name="team"       id="team"> </a></div>
               <OurTeam v-waypoint="{ active: true, callback: onWaypoint, options: intersectionOptions }" data-waypoint="team" :content="content"></OurTeam>

               <div class="anchor"><a name="footprint" id="footprint"> </a></div>
               <Footprint v-waypoint="{ active: true, callback: onWaypoint, options: intersectionOptions }" data-waypoint="footprint" :content="content"></Footprint>

               <div class="anchor"><a name="investors" id="investors"> </a></div>
               <div v-waypoint="{ active: true, callback: onWaypoint, options: intersectionOptions }" data-waypoint="investors">
                  <ImageText v-for="(item, index) in content.investorsBlocks" :key="item.id" :align=" index % 2 ? 'left' : 'right'" :img="item.image.url" >
                     <h3 v-if="index===0">Investors</h3>
                     <div v-html="item.text" :class="index===0 ? 'first' : ''"></div>
                  </ImageText>
               </div>
            </div>
         </main>
      </div>
   </div>
</template>

<script>
   import { mapState } from "vuex"
   import VideoHero    from '~/components/VideoHero.vue'
   import IntroText    from '~/components/IntroText.vue'
   import OurTeam      from '~/components/OurTeam.vue'
   import Footprint    from '~/components/Footprint.vue'
   import ImageText    from '~/components/ImageText.vue'

   export default {
      data: () => ({
         intersectionOptions: {
            root      : null,
            rootMargin: '0px 0px 0px 0px',
            threshold : [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9]
         },
         content : {}
      }),

      created () {
         this.content = require('~/static/data/homepage.json')
      },

      methods: {
         onWaypoint( { el, going, direction, _entry } ) {

            if( direction === this.$waypointMap.DIRECTION_TOP ) {
               if( _entry.boundingClientRect.top > 0 && _entry.boundingClientRect.top < 500 ) {
                  this.$store.commit('updateNavItem', el.dataset.waypoint);
               }
            }

            if( direction === this.$waypointMap.DIRECTION_BOTTOM ) {
               if( _entry.boundingClientRect.top < 0 && _entry.boundingClientRect.top > -250 ) {
                  this.$store.commit('updateNavItem', el.dataset.waypoint);
               }
            }
         }
      },

      components: {
         VideoHero, IntroText, OurTeam, Footprint, ImageText
      }
   }
</script>


<style lang="scss" scoped>



</style>
