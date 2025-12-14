const Pool = require("pg").Pool
const pg = require("pg")

pg.types.setTypeParser(20, val=>parseInt(val)) //BIGINT
pg.types.setTypeParser(1700, val=>parseFloat(val)) // NUMBERIC


const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: {
    require: true,
    rejectUnauthorized: false, // MUHIM
  },
})
module.exports = pool