const express = require('express');
const app = express();
const port = 3003;
const cors = require("cors");
app.use(express.json({ limit: '10mb' }));
app.use(cors());
const mysql = require("mysql");
const md5 = require('js-md5');
const uuid = require('uuid');

app.use(
  express.urlencoded({
      extended: true,
  })
);
app.use(express.json());

const con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "rubu_siuvykla",
});

const doAuth = function(req, res, next) {
  if (0 === req.url.indexOf('/admin')) { // admin
      const sql = `
      SELECT
      name, role
      FROM users
      WHERE session = ?
  `;
      con.query(
          sql, [req.headers['authorization'] || ''],
          (err, results) => {
              if (err) throw err;
              if (!results.length || results[0].role !== 'admin') {
                  res.status(401).send({});
                  req.connection.destroy();
              } else {
                  next();
              }
          }
      );
  } else if (0 === req.url.indexOf('/login-check') || 0 === req.url.indexOf('/login')) {
      next();
  } else { // fron
      const sql = `
      SELECT
      name, role
      FROM users
      WHERE session = ?
  `;
      con.query(
          sql, [req.headers['authorization'] || ''],
          (err, results) => {
              if (err) throw err;
              if (!results.length) {
                  res.status(401).send({});
                  req.connection.destroy();
              } else {
                  next();
              }
          }
      );
  }
}
app.use(doAuth)

// AUTH
app.get("/login-check", (req, res) => {
  let sql;
  let requests;
  if (req.query.role === 'admin') {
      sql = `
      SELECT
      name
      FROM users
      WHERE session = ? AND role = ?
      `;
      requests = [req.headers['authorization'] || '', req.query.role];
  } else {
      sql = `
      SELECT
      name, id
      FROM users
      WHERE session = ?
      `;
      requests = [req.headers['authorization'] || ''];
  }
  con.query(sql, requests, (err, result) => {
      if (err) throw err;
      if (!result.length) {
          res.send({ msg: 'error' });
      } else {
          res.send({ msg: 'ok', result });
      }
  });
});

//LOGIN
app.post("/login", (req, res) => {
  const key = uuid.v4();
  const sql = `
  UPDATE users
  SET session = ?
  WHERE name = ? AND pass = ?
`;
  con.query(sql, [key, req.body.user, md5(req.body.pass)], (err, result) => {
      if (err) throw err;
      if (!result.affectedRows) {
          res.send({ msg: 'error', key: '' });
      } else {
          res.send({ msg: 'ok', key });
      }
  });
});


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
      res.send({ result });
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

//BACK DELETE CLOTHES
app.delete("/admin/clothes/:id", (req, res) => {
  const sql = `
  DELETE FROM clothes
  WHERE id = ?
  `;
  con.query(sql, [req.params.id], (err, result) => {
      if (err) throw err;
      res.send({ result });
  });
});

//BACK DELETE PHOTO
app.delete("/admin/photos/:id", (req, res) => {
  const sql = `
  UPDATE clothes
  SET photo = null
  WHERE id = ?
  `;
  con.query(sql, [req.params.id], (err, result) => {
      if (err) throw err;
      res.send({ result });
  });
});

//BACK EDIT CLOTHES
app.put("/admin/clothes/:id", (req, res) => {
  const sql = `
  UPDATE clothes
  SET color = ?, type = ?, price = ?, photo = ?
  WHERE id = ?
  `;
  con.query(sql, [req.body.color, req.body.type, req.body.price, req.body.photo, req.params.id], (err, result) => {
      if (err) throw err;
      res.send({ result });
  });
});

//FRONT READ CLOTHES
app.get("/clothes", (req, res) => {
  const sql = `
SELECT *
FROM clothes
`;
  con.query(sql, (err, result) => {
      if (err) throw err;
      res.send(result);
  });
});

//FRONT CREATE ORDER
app.post("/orders", (req, res) => {
  const sql = `
  INSERT INTO orders
  (size, price, type, color, clothes_id, users_id, verify)
  VALUES (?, ?, ?, ?, ?, ?, ?)
  `;
  con.query(sql, [req.body.size, req.body.price, req.body.type, req.body.color, req.body.clothesId, req.body.usersId, req.body.verify ? 0 : 1], (err, result) => {
      if (err) throw err;

      res.send({ result });
  });
});

//FRONT READ ORDERS
app.get("/orders", (req, res) => {
  const sql = `
SELECT *
FROM orders AS revOrder
`;
  con.query(sql, (err, result) => {
      if (err) throw err;
      res.send(result);
  });
});

//FRONT READ USERS
app.get("/users", (req, res) => {
  const sql = `
SELECT name, id
FROM users
`;
  con.query(sql, (err, result) => {
      if (err) throw err;
      res.send(result);
  });
});

//FRONT DELETE ORDER
app.delete("/orders/:id", (req, res) => {
  const sql = `
  DELETE FROM orders
  WHERE id = ?
  `;
  con.query(sql, [req.params.id], (err, result) => {
      if (err) throw err;
      res.send({ result });
  });
});

//FRONT EDIT ORDER
app.put("/orders/:id", (req, res) => {
  const sql = `
  UPDATE orders
  SET verify = ?
  WHERE id = ?
  `;
  con.query(sql, [req.body.verify, req.params.id], (err, result) => {
      if (err) throw err;
      res.send({ result });
  });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})