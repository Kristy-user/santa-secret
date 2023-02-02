
const { Pool } = require('pg');
const connectionString =
  'postgresql://postgres:MlHnhpn2xxAZStIa4nBO@containers-us-west-17.railway.app:5773/railway';
const pool = new Pool({
  connectionString,
});
module.exports = pool;
