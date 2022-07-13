const express = require("express");
const mysql = require("mysql");
const BodyParse = require("body-parser")


const app = express();
app.use(BodyParse.urlencoded({extended: true}));

app.set("view engine", "ejs")
app.set("views", "views");


const db = mysql.createConnection({
    host: "localhost",
    database: "pijarcamp",
    user: "root",
    password: ""
})

db.connect((err) =>{
    if(err) throw err
    console.log("Database connected...")
})

const sql = "SELECT * FROM produk";
app.get("/", (req, res) =>{
    db.query(sql, (req, result) =>{
        const produks = JSON.parse(JSON.stringify(result))
        res.render("index", {produks: produks, title: "NAMA BARANG"})
    })
})

app.post("/tambahkan", (req, res) =>{
    const insertSql = `INSERT INTO produk (nama_produk, keterangan, harga, jumlah) VALUES ("${req.body.nama}", "${req.body.keterangan}", "${req.body.harga}", "${req.body.jumlah}")`;

    db.query(insertSql, (err, result) =>{
        if(err) throw err;
        res.redirect("/")
    })
})

app.listen(8000, () =>{
    console.log("Server ready")
})