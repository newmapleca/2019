const fs = require('fs-extra')
const fetch = require("node-fetch");


module.exports = function fetchData() {

   // writeData writes the data to a file given the path
   const writeData = (path, data) => {
      return new Promise((resolve, reject) => {
         try {
            fs.ensureFileSync(path)
            fs.writeJson(path, data, resolve(`${path} Write Successful`))
         } catch (e) {
            console.error(`${path} Write failed. ${e}`)
            reject(`${path} Write Failed. ${e}`)
         }
      })
   }

   const getData = async builder => {

      console.log( 'Start getting homepage content' )

      const fetcher  = []
      const response = await fetch(
         'https://graphql.datocms.com/', {
            method: 'POST',
            headers: {
               'Content-Type' : 'application/json',
               'Accept'       : 'application/json',
               'Authorization': 'Bearer 128a944de391a5e1ced4f070ecb1a0',
            },
            body: JSON.stringify({
               query: `{
                    homepage {
                      id
                      aboutText
                      leadershipTeam {
                        id
                        name
                        twitterUrl
                        linkedinUrl
                        jobTitle
                        instagramUrl
                        facebookUrl
                        bio
                        headshot {
                          url
                        }
                      }
                      footprintLocations {
                        bulletPoints
                        description
                        id
                        anchor
                        image1 {
                          url
                        }
                        image2 {
                          url
                        }
                        location
                        externalUrl
                        extraLinkLabel
                        extraLinkUrl
                        logo {
                          url
                        }
                        title
                      }
                      investorsBlocks {
                        id
                        image {
                          url
                        }
                        text
                      }
                      technicalTeamImage {
                        url
                      }
                      technicalTeamFootnotes
                      technicalTeamIcons {
                        id
                        svg {
                          url
                        }
                        text
                      }
                      technicalTeamIntro
                      advisoryBoard {
                        id
                        bio
                        facebookUrl
                        headshot {
                          url
                        }
                        instagramUrl
                        jobTitle
                        linkedinUrl
                        name
                        twitterUrl
                      }
                    }
               }`
            }),
         }
      ).then(res => res.json())

      fetcher.push(writeData( 'static/data/homepage.json', response.data.homepage ))

      // write all files
      return Promise.all(fetcher)
         .then(() => {
            console.log('Done grabbing home page content')
         })
         .catch(e => {
            throw e
      })
   }

   // Run it before the nuxt build stage
   this.nuxt.hook('build:before', getData)
}
