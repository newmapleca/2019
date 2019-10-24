<template>
   <div>
      <header class="l-header">
         <div class="l-container l-container--legacy-full">
            <div class="c-header">
               <div class="c-logo" @click="setActiveNav('')"><nuxt-link to="/" @click.native="smoothScroll('#top')"><img src="/images/logo-white.png" alt="New Maple Logo" srcset="/images/logo-white@2x.png 2x"></nuxt-link></div>

               <nav class="c-nav">
                  <ul class="h-horizontal c-nav__ul">
                     <li :class="activeNavItem == 'about' ? 'is-active' : ''" @click="setActiveNav('about')"><nuxt-link :to="{ path: '/', hash:'#about' }" @click.native="smoothScroll('#about')">About Us</nuxt-link></li>
                     <li :class="activeNavItem == 'team' ? 'is-active' : ''" @click="setActiveNav('team')">
                        <nuxt-link :to="{ path: '/', hash:'#team' }" @click.native="smoothScroll('#team')">Our Team</nuxt-link>
                        <ul>
                           <li><nuxt-link :to="{ path: '/', hash: '#leadership' }" @click.native="setActiveTeam('leadership');">Leadership Team</nuxt-link></li>
                           <li><nuxt-link :to="{ path: '/', hash: '#technical'  }" @click.native="setActiveTeam('technical');" >Technical Team</nuxt-link></li>
                           <li><nuxt-link :to="{ path: '/', hash: '#advisors'   }" @click.native="setActiveTeam('advisors');"  >Advisors</nuxt-link></li>
                        </ul>
                     </li>
                     <li :class="activeNavItem == 'footprint' ? 'is-active' : ''" @click="setActiveNav('footprint')">
                        <nuxt-link :to="{ path: '/', hash:'#footprint' }" @click.native="smoothScroll('#footprint')">Footprint</nuxt-link>

                        <ul>
                           <li><nuxt-link :to="{ path: '/', hash: '#canwe' }"         @click.native="setActiveFootprint('canwe')"        >Canwe</nuxt-link></li>
                           <li><nuxt-link :to="{ path: '/', hash: '#allegro' }"       @click.native="setActiveFootprint('allegro')"      >Allegro Acres</nuxt-link></li>
                           <li><nuxt-link :to="{ path: '/', hash: '#northerngreen' }" @click.native="setActiveFootprint('northerngreen')">Northern Green</nuxt-link></li>
                        </ul>
                     </li>
                     <li :class="activeNavItem == 'investors' ? 'is-active' : ''" @click="setActiveNav('investors')">
                        <nuxt-link :to="{ path: '/', hash:'#investors' }" @click.native="smoothScroll('#investors')">Investors</nuxt-link>
                     </li>
                     <li :class="activeNavItem == 'contact' ? 'is-active is-active--always' : ''"><nuxt-link to="/contact">Contact Us</nuxt-link></li>
                     <li class="is-social">
                        <a href="https://www.facebook.com/nmhcanada/" target="_blank"><img src="/images/icons/facebook-white.svg"></a>
                        <a href="https://www.instagram.com/_newmaple/" target="_blank"><img src="/images/icons/instagram-white.svg"></a>
                        <a href="https://twitter.com/_newmaple" target="_blank"><img src="/images/icons/twitter-white.svg"></a>
                        <a href="https://www.linkedin.com/company/new-maple/" target="_blank"><img src="/images/icons/linkedin-white.svg"></a>
                     </li>
                  </ul>
                  <a href="#" class="c-menu-toggle" @click.prevent="toggleMenu" :class="mobileMenuOpen ? 'c-menu-toggle--active' : ''">
                     <span></span>
                     <span></span>
                     <span></span>
                  </a>
               </nav>
            </div>
         </div>
      </header>

      <nav class="c-mobilemenu" v-if="mobileMenuOpen">
         <div class="l-container">
            <div class="menu">
               <ul class="c-nav__ul">
                  <li><nuxt-link :to="{ path: '/', hash:'#about' }" @click.native="smoothScroll('#about'); toggleMenu( 'off' );">About Us</nuxt-link></li>
                  <li :class="mobileMenuTeamOpen ? 'open' : ''">
                     <nuxt-link :to="{ path: '/', hash:'#team' }" @click.native="smoothScroll('#team'); toggleMenu( 'off' );">Our Team</nuxt-link>
                     <a href="#" class="toggle" @click.prevent="showSub('team')"><span></span><span></span></a>
                     <ul v-if="mobileMenuTeamOpen">
                        <li><nuxt-link :to="{ path: '/', hash: '#leadership' }" @click.native="setActiveTeam('leadership'); toggleMenu( 'off' );">Leadership Team</nuxt-link></li>
                        <li><nuxt-link :to="{ path: '/', hash: '#technical'  }" @click.native="setActiveTeam('technical'); toggleMenu( 'off' );" >Technical Team</nuxt-link></li>
                        <li><nuxt-link :to="{ path: '/', hash: '#advisors'   }" @click.native="setActiveTeam('advisors'); toggleMenu( 'off' );"  >Advisors</nuxt-link></li>
                     </ul>
                  </li>
                  <li :class="mobileMenuFootprintOpen ? 'open' : ''">
                     <nuxt-link :to="{ path: '/', hash:'#footprint' }" @click.native="smoothScroll('#footprint'); toggleMenu( 'off' );">Footprint</nuxt-link>
                     <a href="#" class="toggle" @click.prevent="showSub('footprint')"><span></span><span></span></a>
                     <ul v-if="mobileMenuFootprintOpen">
                        <li><nuxt-link :to="{ path: '/', hash: '#canwe' }"         @click.native="setActiveFootprint('canwe'); toggleMenu( 'off' );"        >Canwe</nuxt-link></li>
                        <li><nuxt-link :to="{ path: '/', hash: '#allegro' }"       @click.native="setActiveFootprint('allegro'); toggleMenu( 'off' );"      >Allegro Acres</nuxt-link></li>
                        <li><nuxt-link :to="{ path: '/', hash: '#northerngreen' }" @click.native="setActiveFootprint('northerngreen'); toggleMenu( 'off' );">Northern Green</nuxt-link></li>
                     </ul>
                  </li>
                  <li>
                     <nuxt-link :to="{ path: '/', hash:'#investors' }" @click.native="smoothScroll('#investors'); toggleMenu( 'off' );">Investors</nuxt-link>
                  </li>
                  <li><nuxt-link to="/contact" @click.native="toggleMenu( 'off' );">Contact Us</nuxt-link></li>
                  <li class="is-social">
                     <a href="#"><img src="/images/icons/facebook-white.svg"></a>
                     <a href="#"><img src="/images/icons/twitter-white.svg"></a>
                     <a href="#"><img src="/images/icons/linkedin-white.svg"></a>
                     <a href="https://www.instagram.com/_newmaple/" target="_blank"><img src="/images/icons/instagram-white.svg"></a>
                  </li>
               </ul>
            </div>
         </div>
      </nav>
   </div>
</template>

<script>
   import { mapState } from "vuex";

   export default {
      data() {
         return {
            mobileMenuOpen         : false,
            mobileMenuFootprintOpen: false,
            mobileMenuTeamOpen     : false
         }
      },

      methods : {
         showSub( section ) {
            if( section  == 'team' ) {
               this.mobileMenuTeamOpen = !this.mobileMenuTeamOpen;
               this.mobileMenuFootprintOpen = false;
            }
            if( section  == 'footprint' ) {
               this.mobileMenuFootprintOpen = !this.mobileMenuFootprintOpen;
               this.mobileMenuTeamOpen = false;
            }
         },

         toggleMenu( status = '' ) {
            if( status  == 'off' ) {
               this.mobileMenuOpen = false;
            } else {
               this.mobileMenuOpen = !this.mobileMenuOpen;
            }

            if( this.mobileMenuOpen ) {
               document.querySelector('body').classList.add('has-mobile-menu');
            } else {
               document.querySelector('body').classList.remove('has-mobile-menu');
            }
         },

         setActiveNav(tab) {
            this.$store.commit('updateNavItem', tab );
            this.toggleMenu( 'off' );
         },

         smoothScroll(tab) {
            let element = document.querySelector(tab);
            if( element ) {
               let rect = element.getBoundingClientRect();

               this.$store.commit('updateNavItem', tab.replace('#','') );
               this.toggleMenu( 'off' );

               let currentScrollTop = window.pageYOffset;

               window.scrollTo({
                  'behavior': 'smooth',
                  'left'    : 0,
                  'top'     : currentScrollTop + rect.top
               });
            }
         },

         setActiveTeam( tab ) {
            this.$store.commit('updateTeamTab', tab);
            this.smoothScroll( '#' + tab);
         },

         setActiveFootprint( tab ) {
            this.$store.commit('updateFootprintTab', tab);
            this.smoothScroll( '#' + tab);
         }
      },

      computed: {
         ...mapState(["activeNavItem"])
      },

      mounted: function() {
         const layoutHeader = document.querySelector('header.l-header');
         const pageHero     = document.querySelector('section.c-pagehero');

         const w=window,
         d=document,
         e=d.documentElement,
         g=d.getElementsByTagName('body')[0],
         x=w.innerWidth||e.clientWidth||g.clientWidth,
         y=w.innerHeight||e.clientHeight||g.clientHeight;

         let heroHeight = y < 600 ? 600 : y;

         window.onscroll = function() {
            if( window.pageYOffset >= ( heroHeight - 120 ) ) {

               document.querySelector('body').classList.add('has-sticky-menu');
               if( layoutHeader ) layoutHeader.classList.add('is-sticky');

            } else {
               if( window.pageYOffset < y && !document.querySelector('body').classList.contains('has-mobile-menu') ) {
                  document.querySelector('body').classList.remove('has-sticky-menu');
                  if( layoutHeader ) layoutHeader.classList.remove('is-sticky');
               }
            }
         };
      },
   }
</script>


<style lang="scss" scoped>

   .l-header {
      position: relative;
      z-index : 20;

      body.has-mobile-menu & {
         z-index          : 101;
      }

      &.is-sticky {
         position         : fixed;
         width            : 100%;
         top              : 0;
         z-index          : 1000;
         background-color : coral;
         background-image : url(/images/gradient.svg);
         background-repeat: no-repeat;
         background-size  : cover;

         body.has-mobile-menu & {
            background-color : transparent !important;
            background-image : none !important;
         }

         .c-nav {
            ul.c-nav__ul {
               & > li {
                  &.is-active {
                     & > a {
                        &:after {
                           opacity : 1;
                           min-width: calc( 100% - 40px );

                           @include legacy {
                              min-width: calc( 100% - 20px );
                           }
                        }
                     }
                  }

                  ul {
                     top       : 95px;
                     background: rgba(235,46,34, 0.85);
                  }
               }
            }
         }
      }
   }

   .c-header {
      position   : relative;
      height     : 95px;
      display    : flex;
      align-items: center;
      z-index    : 3;
   }

   ul.c-nav__ul {
      &:hover {
         li {
            opacity : 0.6;
         }
      }

      & > li {
         margin-left: 20px;
         position   : relative;

         &:hover {
            opacity : 1;
         }

         a {
            display        : block;
            padding        : 47px 20px 30px;
            color          : #fff;
            font-weight    : bold;
            font-size      : 15px;
            line-height    : 18px;
            letter-spacing : 1.5px;
            text-transform : uppercase;
            text-decoration: none;
            position       : relative;

            @include legacy {
               padding  : 47px 10px 30px;
               font-size: 14px;
            }
         }

         &.is-social {

            &:hover {
               a {
                  opacity : 0.6;
               }
            }


            a {
               display     : inline-block;
               padding     : 20px 5px 0;
               margin-right: 5px;

               &:after {
                  display: none !important;
               }

               @include legacy {
                  margin-right: 0px;
                  padding     : 20px 4px 0;
               }

               &:hover {
                  opacity : 1 !important;
               }

               img {
                  width   : 18px;
                  height  : 18px;
                  position: relative;
                  top     : 3px;
               }
            }
         }

         &:hover {

            a {
               &:after {
                  opacity: 1;
               }
            }
         }

         ul {
            display         : inline-block;
            white-space     : nowrap;
            text-align      : left;
            margin          : 0;
            padding         : 8px 0;
            background-color: transparent;

            li {
               opacity: 1 !important;
               margin : 0 10px;
               padding: 0;
               display: block;

               @include legacy {
                  margin : 0;
               }

               a {
                  display    : inline-block;
                  padding    : 12px;
                  font-size  : 13px;
                  color      : #fff;
                  font-weight: bold;
                  white-space: nowrap;
               }
            }
         }
      }
   }

   .c-nav {
      text-align : right;
      flex       : 1;

      ul.c-nav__ul {
         @include tablet-down {
            display: none;
         }

         & > li {
            @include legacy {
               margin-left: 10px;
            }

            &.is-active--always,
            &:hover {
               & > a {
                  &:after {
                     opacity  : 1;
                     min-width: calc( 100% - 40px );

                     @include legacy {
                        min-width: calc( 100% - 20px );
                     }
                  }
               }
            }

            &:hover {
               ul {
                  height : auto;
                  opacity: 1;
                  z-index: 1;
               }
            }

            a {
               &:after {
                  opacity   : 0;
                  position  : absolute;
                  top       : 75px;
                  content   : '';
                  border-top: 4px solid #fff;
                  left      : 20px;
                  min-width : 0%;
                  transition: all 0.5s ease;

                  @include legacy {
                     left : 10px;
                  }
               }
            }

            ul {
               height          : 0px;
               overflow        : hidden;
               opacity         : 0;
               z-index         : -1;
               position        : absolute;
               top             : 80px;
               left            : 0;
               display         : inline-block;
               white-space     : nowrap;
               text-align      : left;
               margin          : 0;
               padding         : 8px 0;
               background-color: transparent;

               li {
                  a {
                     &:hover {
                        &:after {
                           opacity  : 1 !important;
                           min-width: calc( 100% - 24px );
                        }
                     }

                     &:after {
                        opacity   : 0 !important;
                        left      : 12px;
                        top       : 32px;
                        border-top: 2px solid #fff;
                     }
                  }
               }
            }
         }
      }


      .c-menu-toggle {
         display : none;
         z-index : 25;

         @include tablet-down {
            display   : block;
            position  : absolute;
            right     : 0;
            height    : 24px;
            width     : 30px;
         }

         span {
            height          : 4px;
            width           : 30px;
            position        : absolute;
            left            : 0;
            top             : 0;
            background-color: #fff;
            transition      : all 0.3s ease-in-out;

            &:nth-child(1) {
               body.has-mobile-menu & {
                  background-color: transparent;
               }
            }

            &:nth-child(2) {
               top: calc( 50% - 2px );

               body.has-mobile-menu & {
                  top   : 10px;
                  transform: rotate(-45deg);
               }
            }

            &:nth-child(3) {
               bottom: 0;
               top   : auto;

               body.has-mobile-menu & {
                  transform: rotate(45deg);
                  bottom: auto;
                  top   : 10px;
               }
            }
         }
      }
   }

   .c-mobilemenu {
      position         : fixed;
      top              : 0;
      left             : 0;
      height           : 100%;
      width            : 100%;
      z-index          : 100;
      // background-color : rgba(235,46,34, 0.85);
      // background-image : url(/images/gradient.svg);
      // background-repeat: no-repeat;
      // background-size  : cover;

      body.has-sticky-menu & {
         background-color : rgba(235,46,34, 0.85);
         background-image : url(/images/gradient.svg);
         background-repeat: no-repeat;
         background-size  : cover;
      }

      div.menu {
         margin-top: 120px;
      }

      ul {
         margin    : 0;
         padding   : 0;
         list-style: none;

         & > li {
            margin  : 0;
            padding : 0;
            position: relative;

            a {
               color          : #fff;
               text-transform : uppercase;
               text-decoration: none;
               padding        : 15px 0;
               font-size      : 20px;
               width          : 200px;

               &:after {
                  display: none !important;
               }
            }

            &.is-social {

               &:hover {
                  a {
                     opacity : 0.6;
                  }
               }


               a {
                  display     : inline-block;
                  padding     : 20px 5px 0;
                  margin-right: 5px;
                  width : auto;

                  &:after {
                     display: none !important;
                  }

                  @include legacy {
                     margin-right: 0px;
                     padding     : 20px 4px 0;
                  }

                  &:hover {
                     opacity : 1 !important;
                  }

                  img {
                     width   : 18px;
                     height  : 18px;
                     position: relative;
                     top     : 3px;
                  }
               }
            }

            a.toggle {
               position: absolute;
               top     : 15px;
               left    : 240px;
               height  : 16px;
               width   : 16px;
               padding : 0;

               span {
                  height          : 4px;
                  width           : 16px;
                  position        : absolute;
                  background-color: #fff;
                  transition      : all 0.3s ease-in-out;
                  transform-origin: 50% 50%;

                  &:nth-child(1) {
                     left            : 0;
                     top             : 50%;
                     margin-top      : -2px;
                  }

                  &:nth-child(2) {
                     transform  : rotate(90deg);
                     top        : 50%;
                     left       : 0;
                     margin-top : -2px;
                  }
               }
            }

            &.open {
               ul {
                  max-height: 200px;
               }

               a.toggle {
                  span {
                     &:nth-child(1) {
                        opacity: 0;
                     }

                     &:nth-child(2) {
                        transform  : rotate(-180deg);
                        top        : 50%;
                        left       : 0;
                        margin-top : -2px;
                     }
                  }
               }
            }

            ul {
               margin    : 0;
               padding   : 0;
               overflow  : hidden;
               max-height: 0;
               transition: max-height 0.3s ease-in-out 0.3s;
            }
         }

      }

   }
</style>
