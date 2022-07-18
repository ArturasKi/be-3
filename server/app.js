const express = require('express')
const app = express()
const port = 3003
const cors = require("cors");
app.use(express.json({ limit: '10mb' }));
app.use(cors());
const mysql = require("mysql");

const con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "rubu_siuvykla",
});

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

//BACK CREATE CLOTHES
app.post("/admin/clothes", (req, res) => {
  const sql = `
  INSERT INTO clothes
  (color, type, price, photo)
  VALUES (?, ?, ?, ?)
  `;
  con.query(sql, [
    req.body.color ? req.body.color : 0, 
    req.body.type ? req.body.type : 0, 
    req.body.price ? req.body.price : 0, 
    req.body.photo
  ], (err, result) => {
      if (err) throw err;
      res.send({ result, msg: { text: 'OK, new Cat was created', type: 'success' } });
  });
});

//BACK READ CLOTHES
app.get("/admin/clothes", (req, res) => {
  const sql = `
SELECT *
FROM clothes
`;
  con.query(sql, (err, result) => {
      if (err) throw err;
      res.send(result);
  });
});