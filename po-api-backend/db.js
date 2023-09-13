const { Pool } = require('pg');

// Create a PostgreSQL pool
const pool = new Pool({
  user: 'karl',                  // Your PostgreSQL username
  host: 'localhost',             // Host where PostgreSQL is running
  database: 'testdb',            // Your database name
  password: '021096',            // Your database password
  port: 5432,                    // Default PostgreSQL port
});

function testDatabaseConnection(callback) {
  pool.query('SELECT NOW()', (err, res) => {
    if (err) {
      console.error('Error connecting to the database:', err);
    } else {
      console.log('Connected to the database');
    }
    callback(err);
  });
}

module.exports = {
  pool,
  testDatabaseConnection,
};