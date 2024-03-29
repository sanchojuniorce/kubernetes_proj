const express = require('express')
const app = express()

app.get('/', function (req, res) {
    res.send('Hello World, mi chiamo Youtube')
})

app.listen(3000, () => {
    console.log('Starting server :rocket')
})
