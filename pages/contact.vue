<template>
   <div class="l-body">
      <main class="l-main">
         <ImageHero></ImageHero>
         <div class="l-content">
            <ContactUs></ContactUs>
         </div>
      </main>
   </div>
</template>


<script>
   import { mapState } from "vuex"
   import ImageHero  from '~/components/ImageHero.vue'
   import ContactUs  from '~/components/ContactUs.vue'

   export default {
      mounted: function() {
         this.$store.commit('updateNavItem', 'contact');
      },

      components: {
         ImageHero, ContactUs
      }
   }
</script>


<style lang="scss" scoped>

</style>
