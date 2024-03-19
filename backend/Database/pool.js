const { Pool } = require('pg');
const pool = new Pool({
    user: 'gyancarlospinto',
    host: 'localhost',
    database: 'tasks_db',
    port: 5432,
});

module.exports = pool;
