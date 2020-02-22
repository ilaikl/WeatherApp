const express = require('express')
const router = express.Router()
const request = require('request')
const City = require('../model/City.js')

const appKey = '0544ba84c2de89aadcd4f5a6bece1dc3'

router.get('/city/:cityName', function (req, res) {
    let cityName = req.params.cityName
    request(`http://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${appKey}&units=metric`, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            res.send(body)
        }
        else {
            console.log("errorrrrr")
        }
    })
})

router.get('/cities', function (req, res) {

    City.find({}, function (err, cities) {
        res.send(cities)
    })

})

router.post('/city', async function (req, res) {
    if(req.body.name!=undefined && req.body.temperature!=undefined){
        let city = new City({ name: req.body.name, temperature: req.body.temperature, condition: req.body.condition, conditionPic: req.body.conditionPic })

        await City.remove({"name":req.body.name})

        city.save()
        
        res.end()

    }
})



router.delete('/city/:cityName', function (req, res) {
    City.deleteOne({ name: req.params.cityName }, function (err, ct) {
        res.send(ct)
    })
})


module.exports = router