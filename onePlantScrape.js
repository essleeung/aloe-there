let request = require('request')
let cheerio = require('cheerio')
let async = require('async')
let db = require('./models')
let urlArray = []

const scrape = () => {
    let plants = []
    db.plant.findAll({
        attributes: ['link']
    })
        .then(results => {
            results.forEach(e => {
                urlArray.push(e.link)
            })
            console.log(urlArray)
            async.forEach(urlArray, (url, done) => {
                request(url, (error, response, body) => {
                    let $ = cheerio.load(body)
                    plants = $('.product-container').map((i, el) => {
                        return {
                            sciName: $(el).find('.product-short-description > p').text(),
                            description: $(el).find('.entry-content > p').text(),
                            location: $(el).find('.woocommerce-product-attributes-item--attribute_location > .woocommerce-product-attributes-item__value').text().trim(),
                            care: $(el).find('.woocommerce-product-attributes-item--attribute_care > .woocommerce-product-attributes-item__value').text().trim(),
                        }
                    })
                    .get()
                })
                done()
                console.log(plants)
            })
                .catch(err => {
                    console.log(err)
                })
        }, () => { process.exit() })
}



scrape()
// request('https://interiorplants.ca/product/fiddle-leaf-fig-tree-standard/', (error, response, body) => {
//     let $ = cheerio.load(body)
//     let plants = $('.product-container').map((i, el) => {
//         return {
//             sciName: $(el).find('.product-short-description > p').text(),
//             description: $(el).find('.entry-content > p').text(),
//             location: $(el).find('.woocommerce-product-attributes-item--attribute_location > .woocommerce-product-attributes-item__value').text().trim(),
//             care: $(el).find('.woocommerce-product-attributes-item--attribute_care > .woocommerce-product-attributes-item__value').text().trim(),
//         }
//     })
//         .get()
//     console.log(plants)
// })


