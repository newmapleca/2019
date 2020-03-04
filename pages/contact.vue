<template>
   <div class="l-body">
      <main class="l-main">
         <ImageHero :content="content"></ImageHero>
         <div class="l-content">
            <ContactUs :content="content"></ContactUs>
         </div>
      </main>
   </div>
</template>


<script>
   import { mapState } from "vuex"
   import ImageHero  from '~/components/ImageHero.vue'
   import ContactUs  from '~/components/ContactUs.vue'

   export default {
      data: () => ({
         content : {}
      }),

      mounted: function() {
         this.$store.commit('updateNavItem', 'contact');
      },

      created () {
         this.content = require('~/static/data/contactus.json')
      },

      components: {
         ImageHero, ContactUs
      }
   }
</script>


<style lang="scss" scoped>

</style>
