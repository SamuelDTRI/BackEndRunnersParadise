
const express = require("express")
const app = express()
require("dotenv").config()


const port = 3000





app.listen(port,()=>{
    console.log("running in port", port)
})

