import mysql from 'mysql2';

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'restaurant'
});

connection.connect((err) => {
  if (err) {
    console.error(err);
    return;
  }
  console.log('Connected to database');
});