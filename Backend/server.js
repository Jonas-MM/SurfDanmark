require("dotenv").config();

const express = require('express')
const app = express()
const mongoose = require('mongoose')

const cors = require("cors");

mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true, useUnifiedTopology: true })

const db = mongoose.connection
db.on('error', (error) => console.error(error))
db.once('open', () => console.log('Connected to Database'))

app.use(cors());

app.use(express.json());

// husk for hente billeder fra public mappen
app.use(express.static("public"));

const productsRouter = require("./routes/products");
app.use("/products", productsRouter);


app.listen(3004, () => console.log('Server started'))