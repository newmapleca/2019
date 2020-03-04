<template>
   <section class="c-contactus">
      <div class="l-container">
         <div class="c-contactus__wrapper">
            <div class="c-contactus__left">
               <h1>Contact Us</h1>

               <div v-if="contactSubmitted">
                  <p class="success">
                     <strong>Thank you for contacting us.</strong>
                     <br>We'll be in touch shortly.
                  </p>
               </div>

               <div class="c-contactus__form" v-else>
                  <form name="contact" method="POST" data-netlify="true" data-netlify-honeypot="human" @submit.prevent="onContactSubmit">
                     <div class="input primary">
                        <input type="hidden" name="form-name" value="contact" />
                        <label for="c-contactus__human">Don’t fill this out if you're human: <input type="text" name="human" v-model="contactForm.human" id="c-contactus__human" /></label>
                     </div>

                     <div class="input text">
                        <label class="sr-only">Full Name</label>
                        <input type="text" name="name" v-model="contactForm.name" placeholder="Full Name: *" id="contactFullName" @blur="contactValid.name = ( contactForm.name );">
                        <span class="error" v-if="!contactValid.name">Please enter your name or initials</span>
                     </div>

                     <div class="input text">
                        <label class="sr-only">Email Address</label>
                        <input type="text" name="email" v-model="contactForm.email" placeholder="Email Address: *" id="contactEmail" @blur="contactValid.email = ( contactForm.email );">
                        <span class="error" v-if="!contactValid.email">Please enter a valid email address</span>
                     </div>

                     <div class="input select">
                        <label class="sr-only">Reason for Inquiry</label>
                        <select name="reason" v-model="contactForm.reason" id="contactReason">
                           <option value="">Reason for Inquiry</option>
                           <option value="Investor Relations">Investor Relations</option>
                           <option value="General Enquiry">General Enquiry</option>
                           <option value="Media Enquiry">Media Enquiry</option>
                           <option value="Other">Other</option>
                        </select>
                     </div>

                     <div class="input textarea">
                        <label class="sr-only">Your Message</label>
                        <textarea name="message" v-model="contactForm.message" placeholder="Your Message: *" id="contactMessage" @blur="contactValid.message = ( contactForm.message );"></textarea>
                        <span class="error" v-if="!contactValid.message">Please let us know why you're contacting us</span>
                     </div>

                     <div class="input checkbox">
                        <input type="checkbox" name="newsletter" v-model="contactForm.newsletter" value="1" id="contactNewsletter">
                        <label for="contactNewsletter">Yes, I would like to receive updates from New Maple</label>
                     </div>

                     <button :disabled="!canContact">Submit</button>
                  </form>
               </div>
            </div>

            <div class="c-contactus__right">

               <div>
                  <div class="logo"><img src="/images/logo-color.png" alt="New Maple Logo" srcset="/images/logo-color@2x.png 2x"></div>

                  <div v-html="content.rightSideContent"></div>
               </div>

               <div class="logo-mark"></div>

            </div>
         </div>
      </div>
   </section>
</template>


<script>
   import axios from "axios";

   export default {
      data() {
         return {
            canContact: true,
            contactSubmitted: false,
            contactForm : {
               name      : '',
               email     : '',
               reason    : '',
               message   : '',
               newsletter: '',
               human     : '',
            },
            contactValid : {
               name   : true,
               email  : true,
               message: true
            }
         }
      },

      methods: {
         onContactSubmit() {
            this.canContact           = false;
            this.contactValid.name    = ( this.contactForm.name );
            this.contactValid.email   = ( this.contactForm.email );
            this.contactValid.message = ( this.contactForm.message );

            if( !this.contactValid.name || !this.contactValid.email || !this.contactValid.message ) {
               this.canContact = true;
               return;
            }

            const form = this.encode({
               "form-name" : "contact",
               "name"      : this.contactForm.name,
               "email"     : this.contactForm.email,
               "reason"    : this.contactForm.reason,
               "message"   : this.contactForm.message,
               "newsletter": this.contactForm.newsletter,
               "human"     : this.contactForm.human,
            });

            // post form to netlify form capture database
            axios.post(
               "/",
               form,
               { header: { "Content-Type": "application/x-www-form-urlencoded" } }

            // on success, have sendgrid send the email
            ).then(() => {

               // sendemail
               axios.post(
                  "/.netlify/functions/sendmail",
                  form,
                  { header: { "Content-Type": "application/x-www-form-urlencoded" } }
               );

               // display the thank you message
               this.canContact       = true;
               this.contactSubmitted = true;

               // mailchimp
               if( this.contactForm.newsletter == 1 ) {
                  axios.post(
                     "/.netlify/functions/mailchimp",
                     form,
                     { header: { "Content-Type": "application/x-www-form-urlencoded" } }
                  );
               }

            // error handling
            }).catch(() => {
               this.canContact = true;
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

      props: [
         "content"
      ]
   }
</script>


<style lang="scss">

   section.c-contactus {
      overflow           : hidden;
      background-image   : url(/images/bgs/logo-reverse.png);
      background-repeat  : no-repeat;
      background-position: right -50px bottom;
      background-size    : 50%;
      border-bottom      : 1px solid #d6d6d6;

      @include widescreen  {
         background-size    : 40%;
      }

      div.c-contactus__wrapper {
         padding        : 180px 0 100px;
         display        : flex;
         overflow       : visible;
         justify-content: right;

         @include tablet-down {
            flex-direction: column-reverse;
            padding-top   : 40px;
            padding-bottom: 20px;
         }

         .c-contactus__left {
            flex-grow     : 1;
            flex-direction: column;
            margin-bottom : 60px;
         }

         .c-contactus__right {
            flex-shrink   : 1;
            padding-bottom: 100px;
            padding-right : 50px;
            display       : flex;
            flex-direction: column;

            @include tablet-down {
               padding-bottom: 50px;
            }

            div.logo {
               margin-bottom: 40px
            }

            img {
               max-width: 200px;
            }

            div.logo-mark {
               display : none;

               flex-grow          : 1;
               background-image   : url(/images/bgs/logo-reverse.png);
               background-repeat  : no-repeat;
               background-position: right bottom;
               background-size    : contain;


               @include desktop-up {
                  margin-right: -150px;
               }

               @include legacy {
                  margin-right: -75px;
               }
            }
         }

         .c-contactus__form {
            margin-top: 20px;

            div.input {
               margin-bottom: 25px;


               max-width  : 560px;
               width      : 560px;

               @include tablet {
                  width    : 594px;
                  max-width: 594px;
               }

               @include mobile {
                  max-width  : 100%;
                  width      : 100%;
               }

               &.primary {
                  max-height: 0px !important;
                  overflow  : hidden !important;
                  margin    : 0 !important;
                  padding   : 0 !important;
               }

               &.text {
                  input {
                     border     : 0;
                     background : #F2F2F2;
                     padding    : 20px 17px;
                     font-size  : 20px;
                     color      : #707070;
                     font-family: Lato;
                     width      : calc( 100% - 34px );
                     max-width  : calc( 100% - 34px );

                     &:focus {
                        box-shadow  : 0 0 1px 1px rgba(235,46,34, .7);
                        box-shadow  : 0 0 0 3px -moz-mac-focusring;
                     }
                  }
               }

               span.error {
                  display    : block;
                  font-size  : 13px;
                  font-family: Lato;
                  color      : red;
                  margin-top : 2px;
               }


               &.select {

                  select {
                     font-family        : Lato;
                     display            : block;
                     font-size          : 20px;
                     font-weight        : normal;
                     color              : #707070;
                     line-height        : 1.3;
                     padding            : 20px 17px;
                     width              : 100%;
                     max-width          : 100%;
                     box-sizing         : border-box;
                     margin             : 0;
                     border             : 0px;
                     box-shadow         : 0 1px 0 1px rgba(0,0,0,.04);
                     -moz-appearance    : none;
                     -webkit-appearance : none;
                     appearance         : none;
                     background-color   : #F2F2F2;
                     background-image   : url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%23777777%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22%2F%3E%3C%2Fsvg%3E');
                     background-repeat  : no-repeat, repeat;
                     background-position: right .7em top 50%, 0 0;
                     background-size    : .65em auto, 100%;
                  }

                  select::-ms-expand {
                     display: none;
                  }

                  select:hover {

                  }

                  select:focus {
                     box-shadow  : 0 0 1px 1px rgba(235,46,34, .7);
                     box-shadow  : 0 0 0 3px -moz-mac-focusring;
                     color       : #707070;
                     outline     : none;
                  }

                  select option {
                     font-weight:normal;
                  }
               }

               &.textarea {
                  textarea {
                     font-family: Lato;
                     border     : 0;
                     background : #F2F2F2;
                     padding    : 20px 17px;
                     font-size  : 20px;
                     color      : #707070;
                     max-width  : 526px;
                     width      : 560px;
                     min-height : 200px;

                     @include tablet-down {
                        max-width  : calc( 100% - 34px );
                     }

                     &:focus {
                        box-shadow  : 0 0 1px 1px rgba(235,46,34, .7);
                        box-shadow  : 0 0 0 3px -moz-mac-focusring;
                     }
                  }
               }

               input[type=checkbox] {
                  position: absolute;
                  opacity : 0;

                  & + label {
                     position: relative;
                     cursor  : pointer;
                     padding : 0;
                     font-size: 18px;
                  }

                  // Box.
                  & + label:before {
                     content       : '';
                     margin-right  : 10px;
                     display       : inline-block;
                     vertical-align: text-top;
                     width         : 14px;
                     height        : 14px;
                     background    : white;
                     border        : 3px solid #EB2E22;
                     margin-top    : 1px;
                  }

                  // Box hover
                  &:hover + label:before {
                     background: lighten( #EB2E22, 30% );
                  }

                  // Box focus
                  &:focus + label:before {
                     box-shadow: 0 0 0 3px rgba(0, 0, 0, 0.12);
                  }

                  // Box checked
                  &:checked + label:before {
                     background: #EB2E22;
                  }

                  // Disabled state label.
                  &:disabled + label {
                     color: #b8b8b8;
                     cursor: auto;
                  }

                  // Checkmark. Could be replaced with an image
                  &:checked + label:after {
                     content   : '';
                     position  : absolute;
                     left      : 5px;
                     top       : 9px;
                     background: white;
                     width     : 2px;
                     height    : 2px;
                     box-shadow:
                        2px 0 0 white,
                        4px 0 0 white,
                        4px -2px 0 white,
                        4px -4px 0 white,
                        4px -6px 0 white,
                        4px -8px 0 white;
                     transform: rotate(45deg);
                  }
               }
            }
         }
      }

      h1 {
         margin   : 0;
         padding  : 0;
         font-size: $h3-font-size;
         color    : #000;

         @include tablet {
            font-size    : 50px;
            margin-bottom: 40px;
            line-height  : 1.2em;
         }

         @include mobile {
            font-size    : 35px;
            margin-bottom: 30px;
            line-height  : 1.2em;
         }
      }

      h2 {
         font-size: 32px;
         text-transform: none;
      }

      h3 {
         text-transform: uppercase;
         color         : $color-primary;
         font-size     : 20px;
         font-family   : Lato;
         font-weight   : 700;
         margin        : 0;
         line-height   : 1em;
      }

      h3 + p {
         margin-top : 0;
         font-size: 20px;

         a {
            color: #000;
            text-decoration: none;
         }
      }
   }
</style>
