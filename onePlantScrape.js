let request = require('request')
let cheerio = require('cheerio')
let async = require('async')
let db = require('./models')
const scrape = () => {
    db.plant.findAll({
        attributes: ['link']
    })
    .then(links => {
        let plants = []
        async.forEachSeries(links.map(l => l.link.toString()), (url, done) => {
            request(url, (error, response, body) => {
                if(error){
                    console.log("ERRROR--", error, url)
                    done()
                } else {
                let $ = cheerio.load(body)
                $('.product-container').each((i, el) => {
                    // if (url == "https://interiorplants.ca/product/cactus-copper-king/") {
                    //     console.log("COPPER KING HEREE")
                    //     console.log($(el).find('.product-short-description > p').text(), $(el).find('.woocommerce-product-attributes-item--attribute_location > .woocommerce-product-attributes-item__value').text().trim() )
                    // }
                    plants.push({commonName: $(el).find('h1').text().trim(),
                        sciName: $(el).find('.product-short-description > p').text(),
                        description: $(el).find('.entry-content > p').text(),
                        location: $(el).find('.woocommerce-product-attributes-item--attribute_location > .woocommerce-product-attributes-item__value').text().trim(),
                        care: $(el).find('.woocommerce-product-attributes-item--attribute_care > .woocommerce-product-attributes-item__value').text().trim()
                    })
                      
                })
                    console.log(plants, url)
                    db.plant.findOne({
                        where: {link: url }
                    })
                    .then(
                        plants.forEach(p => {
                            db.plant.update(p, {where: {
                                commonName: p.commonName
                            }})
                            .then(() => 
                            {
                                console.log("Success on update", p.commonName)
                            })
                            .catch(err => {
                                console.log("ERROR on update!", err)
                            })
                        })
                    )
                    .catch(err => {
                        console.log("ERROR on find!", err)
                    })
                // TODO: Update the plant database with the new plant info
                // db.plant.update(plants, where)
                // .then(() => { done() })
                done()
            }
            })
        }) // end of for each
    }).catch(err => {
        console.log(err)
    })
}
scrape()