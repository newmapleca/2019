<template>
   <div>
      <div class="l-body">
         <main class="l-main">
            <ContentPage :pageContent="pageContent"></ContentPage>
         </main>
      </div>
   </div>
</template>

<script>
   import { mapState } from "vuex"
   import ContentPage from '@/components/ContentPage.vue';

   export default {
      data: () => ({
         pageContent : {}
      }),

      mounted() {
         this.$store.commit('updateNavItem', this.$route.params.page );
      },

      created() {
         // find this page
         const allPages   = require('~/static/data/pages.json')
         this.pageContent = allPages.filter( el => el.slug == this.$route.params.page )[0]
      },

      components: {
         ContentPage
      }
   }
</script>


<style lang="scss" scoped>



</style>
