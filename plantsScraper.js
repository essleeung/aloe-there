let request = require('request')
let cheerio = require('cheerio')
let async = require('async')
let db = require('./models')

let baseUrl = 'https://interiorplants.ca/product-category/plants/'

//go through all the site pages to scrape plant name, category and pic
const scrape = () => {
    let urlArray = []
    for (let i = 1; i <= 17; i++) {
        if (i > 1) {
            urlArray.push(baseUrl + 'page/' + i + '/')
        } else {
            urlArray.push(baseUrl)
        }
    }
    console.log(urlArray)
    async.forEach(urlArray, (fullUrl, done) => {
        request(fullUrl, (error, response, body) => {
            let $ = cheerio.load(body)
            let plants = $('.box').map((i, el) => {
                return {
                    commonName: $(el).find('.title-wrapper > .product-title > a').text(),
                    link: $(el).find('a').attr('href'),
                    category: $(el).find('.title-wrapper > .category').text().trim(), 
                    pic: $(el).find('.size-woocommerce_thumbnail').attr('src') 
                }
            }).get()
            let filteredPlants = plants.filter(plant => {
                let text = plant.commonName.toLowerCase()
                return text.indexOf('assorted') === -1 &&
                    text.indexOf('assortment') === -1 &&
                    text.indexOf('collection') === -1 &&
                    plant.link.indexOf('inch') === -1 &&
                    plant.link.indexOf('assortment') === -1 &&
                    plant.link.search(/\d/g) === -1
            })
            console.log('FILTERED PLANTS-----', filteredPlants)    
            db.plant.bulkCreate(filteredPlants)
            .then(()=> {
                console.log("SUCESSS in bulk create!", fullUrl)
                done()
            })
            .catch(err => {
                console.log("ERROR in bulk create", err)
                done()
            })        
        })

    }, () => { process.exit() })





}


scrape()