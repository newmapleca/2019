<template>
   <footer class="l-footer">

      <section class="c-connect" v-if="!hideConnect">
         <div class="l-container">
            <h3>Join New Maple and grow&nbsp;with&nbsp;us</h3>

            <nuxt-link to="/contact" class="button">Connect</nuxt-link>
         </div>
      </section>

      <div class="l-container">
         <section class="c-footer">
            <div class="c-footer__left">
               <div class="c-footer__logo">
                  <nuxt-link to="/" @click.native="smoothScroll('#top')"><img src="/images/logo-color.png" alt="New Maple Logo" srcset="/images/logo-color@2x.png 2x"></nuxt-link>
               </div>

               <div class="c-footer__social">
                  <ul class="h-horizontal">
                     <li><a href="https://www.facebook.com/nmhcanada/" target="_blank"><img src="/images/icons/facebook.svg"></a></li>
                     <li><a href="https://www.instagram.com/_newmaple/" target="_blank"><img src="/images/icons/instagram.svg"></a></li>
                     <li><a href="https://twitter.com/_newmaple" target="_blank"><img src="/images/icons/twitter.svg"></a></li>
                     <li><a href="https://www.linkedin.com/company/new-maple/" target="_blank"><img src="/images/icons/linkedin.svg"></a></li>
                  </ul>
               </div>
            </div>

            <div class="c-footer__navigation">
               <ul class="h-plain">
                  <li><nuxt-link :to="{ path: '/', hash:'#about'     }" @click.native="smoothScroll('#about')"    >About Us</nuxt-link></li>
                  <li><nuxt-link :to="{ path: '/', hash:'#team'      }" @click.native="smoothScroll('#team')"     >Our Team</nuxt-link></li>
                  <li><nuxt-link :to="{ path: '/', hash:'#footprint' }" @click.native="smoothScroll('#footprint')">Footprint</nuxt-link></li>
                  <li><nuxt-link :to="{ path: '/', hash:'#investors' }" @click.native="smoothScroll('#investors')">Investors</nuxt-link></li>
                  <li><nuxt-link :to="{ path: '/contact' }">Contact Us</nuxt-link></li>
               </ul>
            </div>

            <div class="c-footer__newsletter">
               <div v-if="signedUp">
                  <p class="success">
                     <strong>Thank you for signing up to our newsletter!</strong>
                  </p>
               </div>

               <div v-else>
                  <form @submit.prevent="onNewsletterSubmit">
                     <input type="email" v-model="newsletterForm.email" placeholder="Enter your email" name="email">
                     <button>Stay Connected</button>
                  </form>
                  <span class="error" v-if="!newsletterValid.email">Please enter your email address</span>

                  <span class="c-footer__newsletter-casl">
                     Be notified of updates and investment opportunity.<br>
                     We&nbsp;will not spam&nbsp;you.
                  </span>
               </div>
            </div>
         </section>

         <section class="c-legal">
            Copyright @ {{year}} New Maple Holdings. All rights reserved.
         </section>
      </div>
   </footer>
</template>


<script>
   import axios from "axios";

   export default {
      data() {
         return {
            signedUp    : false,
            newsletterValid : {
               email : true
            },
            newsletterForm : {
               email : ''
            }
         }
      },

      methods : {


         smoothScroll(tab) {
            let element = document.querySelector(tab);
            if( element ) {
               let rect = element.getBoundingClientRect();

               let currentScrollTop = window.pageYOffset;

               window.scrollTo({
                  'behavior': 'smooth',
                  'left'    : 0,
                  'top'     : currentScrollTop + rect.top
               });
            }
         },

         onNewsletterSubmit() {
            this.newsletterValid.email = ( this.newsletterForm.email );

            if( !this.newsletterValid.email ) {
               return;
            }

            const form = this.encode({
               "email": this.newsletterForm.email,
            });

            // sign-up to mailchimp
            axios.post(
               "/.netlify/functions/mailchimp",
               form,
               { header: { "Content-Type": "application/x-www-form-urlencoded" } }

            // on success, have sendgrid send the email
            ).then(() => {

               // display the thank you message
               this.signedUp = true;

            // error handling
            }).catch(() => {
               // do nothing?
            });
         },

         encode (data) {
            return Object.keys(data)
               .map(
                  key => `${encodeURIComponent(key)}=${encodeURIComponent(data[key])}`
               )
               .join("&");
         }
      },

      computed: {
         year() {
            let dt = new Date();
            return dt.getYear() + 1900;
         },

         hideConnect() {
            return this.$nuxt.$route.name == 'contact';
         }
      }
   }
</script>


<style lang="scss" scoped>

   footer.l-footer {
      position  : relative;
      z-index   : 20;
      background: #fff;
   }

   section.c-connect {
      background: #eee;
      padding   : 55px 0;

      h3 {
         color        : $color-primary;
         margin-bottom: 30px;

         @include mobile {
            font-size  : 30px;
            line-height: 1.2em;
         }
      }
   }

   section.c-footer {
      display  : flex;
      padding  : 50px 0;
      flex-wrap: wrap;

      .c-footer__left {
         flex          : 0 0 auto;
         min-width     : 300px;
         padding-right : 40px;
         display       : flex;
         flex-direction: column;

         @include legacy {
            min-width: 200px;
         }

         @include tablet {
            min-width: 180px;
            max-width: 180px;
         }

         @include mobile {
            padding-right: 0;
         }
      }

      .c-footer__logo {
         flex-grow: 1;

         img {
            max-width: 207px;

            @include tablet {
               max-width: 180px;
            }
         }

         @include legacy {
            min-width: 50%;
         }

         @include tablet {
            min-width    : 200px;
            padding-right: 0px;
         }

         @include mobile {
            min-width: 100%;
            padding-right: 0;
            margin-bottom: 30px;
         }
      }

      .c-footer__navigation {
         flex-grow  : 1;
         min-width  : 160px;
         padding-top: 55px;

         ul {
            li {
               &:last-of-type {
                  a {
                     margin-bottom: 0;
                  }
               }
            }
         }

         a {
            display        : block;
            font-size      : 20px;
            font-weight    : bold;
            color          : #000;
            text-decoration: none;
            margin-bottom  : 18px;

            @include mobile {
               font-size: 16px;
            }

            &:hover {
               color: $color-primary;
            }
         }

         @include legacy {
            min-width: 200px;
         }

         @include tablet {
            max-width: 100px;
         }

         @include mobile {
            min-width: calc( 50% - 40px );
            padding-left: 0;
         }
      }

      .c-footer__social {
         ul {
            display    : flex;
            align-items: baseline;
         }

         li {

            line-height : 1em;
         }

         a {
            display     : inline-block;
            margin-right: 15px;
            line-height : 1em;

            img {
               display    : block;
               margin     : 0;
               padding    : 0;
               line-height: 1em;
               max-height : 20px;
               max-width  : 20px;
            }
         }
      }

      .c-footer__newsletter {
         padding-top: 55px;

         @include desktop {
            max-width: 500px;
         }

         @include legacy {
            //max-width: 100%;
            //margin-top: -130px;
         }

         @include tablet {
            max-width: 340px;
         }

         @include mobile {
            min-width : 100%;
            margin-top: 30px;
         }

         span.error {
            display    : block;
            font-size  : 13px;
            font-family: Lato;
            color      : red;
            margin-top : 2px;
         }

         form {
            display: flex;

            @include tablet-down {
               flex-wrap: wrap;
            }

            input[type=email] {
               font-size   : 15px;
               padding     : 15px;
               margin-right: 0;
               display     : inline-block;
               border      : 2px solid #ccc;
               border-right: 0;
               min-width   : 300px;

               @include desktop {
                  min-width   : 230px;
               }

               @include legacy {
                  min-width   : 190px;
               }

               @include tablet-down {
                  display      : block;
                  width        : 100%;
                  min-width    : calc( 100% - 34px );
                  border       : 2px solid #ccc;
                  border-bottom: none;
               }
            }

            button {
               font-size     : 15px;
               font-weight   : normal;
               font-family   : 'Archivo Black', sans-serif;
               letter-spacing: .5px;

               @include legacy {
                  padding       : 13px 15px 10px;
                  letter-spacing: 0px;
                  font-size     : 13px;
               }

               @include tablet-down {
                  display  : block;
                  width    : 100%;
                  min-width: calc( 100% - 34px );
               }
            }
         }

         .c-footer__newsletter-casl {
            display    : block;
            margin-top : 5px;
            font-size  : 20px;
            line-height: 1.4em;

            @include legacy {
               font-size: 17px;
            }

            @include tablet {
               font-size: 15px;
            }

            @include mobile {
               font-size: 12px;
            }
         }
      }
   }

   section.c-legal {
      padding-bottom: 20px;
      font-size     : 16px;
      color         : #BFBFBF;

      @include mobile {
         font-size: 10px;
      }
   }

</style>
