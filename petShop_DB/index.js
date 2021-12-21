import pg from 'pg'

export const pool = new pg.Pool({
    user: 'fernandocuriel',
    password: 'password',
    database: 'petshop',
    host: 'localhost',
    port: 5432
})