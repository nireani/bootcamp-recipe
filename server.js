const express = require('express')
const app = express()
const path = require('path')
const request = require("request");

app.use(express.static(path.join(__dirname, 'dist')))
app.use(express.static(path.join(__dirname, 'node_modules')))

const port = 8080

app.listen(port, function () { console.log(`onAir on ${port}`) }
)
app.get(`/sanity`, function (req, res) {
    res.send("ok")
})

app.get(`/recipes/:ingredient`, function (req, res) {
    let ingredient = req.params.ingredient
    request(`https://recipes-goodness.herokuapp.com/recipes/${ingredient}`, function (request, response) {
        let data = JSON.parse(response.body).results
        let newArr = data.map(r => {
            return {
                title: r.title,
                video: r.href,
                img: r.thumbnail,
                ingre: r.ingredients

            }
        })
        res.send(newArr)
    })
})