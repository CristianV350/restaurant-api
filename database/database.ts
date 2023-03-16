import mysql from 'mysql2';

const connection = mysql.createConnection({
  host: 'mysql://b6c611638e833c:7cdaec52@us-cdbr-east-06.cleardb.net/heroku_d9eea5a9760a88a?reconnect=true',
  user: 'b6c611638e833c',
  password: '7cdaec52',
  database: 'heroku_d9eea5a9760a88a'
});

connection.connect((err) => {
  if (err) {
    console.error(err);
    return;
  }
  console.log('Connected to database');
});