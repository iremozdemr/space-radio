const express = require('express');
const mysql = require('mysql2');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = 3001;

// MySQL bağlantısı
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'your_password',
  database: 'ReactRadio'
});

db.connect((err) => {
  if (err) throw err;
  console.log('MySQL Bağlantısı Başarılı');
});

app.use(cors());
app.use(bodyParser.json());

// Kullanıcı Kaydı
app.post('/register', (req, res) => {
  const { username, password } = req.body;

  // Kullanıcı adının benzersiz olup olmadığını kontrol et
  const checkUserQuery = 'SELECT * FROM users WHERE username = ?';
  db.query(checkUserQuery, [username], (err, results) => {
    if (err) return res.status(500).send(err);
    if (results.length > 0) {
      return res.status(400).send({ message: 'Kullanıcı zaten mevcut' });
    }

    // Şifreyi hashle ve veritabanına ekle
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(password, salt);

    const insertUserQuery = 'INSERT INTO users (username, password_hash, salt, remaining_time, balance) VALUES (?, ?, ?, 3600, 0)';
    db.query(insertUserQuery, [username, hashedPassword, salt], (err, results) => {
      if (err) return res.status(500).send(err);
      res.send({ message: 'Kullanıcı kaydedildi' });
    });
  });
});

// Kullanıcı Girişi
app.post('/login', (req, res) => {
  const { username, password } = req.body;

  const query = 'SELECT * FROM users WHERE username = ?';
  db.query(query, [username], (err, results) => {
    if (err) return res.status(500).send(err);
    if (results.length === 0) {
      return res.status(400).send({ message: 'Kullanıcı bulunamadı' });
    }

    const user = results[0];
    const isPasswordValid = bcrypt.compareSync(password, user.password_hash);

    if (!isPasswordValid) {
      return res.status(400).send({ message: 'Şifre yanlış' });
    }

    // JWT Token üret
    const token = jwt.sign({ user_id: user.user_id }, 'SECRET_KEY', { expiresIn: '1h' });
    res.send({ message: 'Giriş başarılı', token });
  });
});

// Sunucu başlat
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
