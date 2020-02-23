const fs    = require('fs-extra')
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

   // paginate the results of a query
   const paginateResults = async (perPage, startAt) => {

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
                  allContentPages(orderBy: title_ASC, filter: {_status: {eq: published}}, first: ${perPage}, skip: ${startAt}) {
                     content
                     slug
                     title
                     metaTags {
                        description
                        title
                        twitterCard
                        image {
                        url
                        }
                     }
                  }
               }`
            }),
         }
      ).then(res => res.json())


      return response.data.allContentPages
   }

   const getData = async builder => {

      console.log( 'Start grabbing pages' )

      const perPage = 50
      const fetcher = []
      let startAt   = 0
      let allPages  = []

      let thesePages = await paginateResults( perPage, startAt )

      while( thesePages.length >= 1 ) {
         thesePages.forEach( function( post, index ) {
            allPages.push( post )
         })

         startAt += perPage
         thesePages = await paginateResults( perPage, startAt )
      }

      fetcher.push(writeData( 'static/data/pages.json', allPages ))

      // write all files
      return Promise.all(fetcher)
         .then(() => {
            console.log('Done grabbing pages')
         })
         .catch(e => {
            throw e
      })
   }

   // Run it before the nuxt build stage
   this.nuxt.hook('build:before', getData)
}
