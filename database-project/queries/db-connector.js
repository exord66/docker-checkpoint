require('dotenv').config();

const config = require('../config')

Pool = require('pg').Pool
const pool = new Pool({
  user: config.pgUser,
  host: config.pgHost,
  database: config.pgDatabase,
  password: config.pgPassword,
  port: config.port,
})
pool.on('error', () => console.log('Lost Postgres connection'))

const createTables = async () => {
  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS Users (
        user_id serial,
        first_name varchar(255),
        last_name varchar(255),
        email varchar(255),
        PRIMARY KEY (user_id)
        );
        
      CREATE TABLE IF NOT EXISTS Manufacturers (
        company_id serial,
        company_name varchar(255),
        contact_name varchar(255),
        contact_email varchar(255),
        contact_number varchar(255),
        PRIMARY KEY (company_id)
        );
        
      CREATE TABLE IF NOT EXISTS Customers (
        customer_id serial,
        company_name varchar(255),
        contact_name varchar(255),
        contact_email varchar(255),
        contact_number varchar(255),
        PRIMARY KEY (customer_id)
        );
        
      CREATE TABLE IF NOT EXISTS Items (
        item_id serial,
        name varchar(255),
        description varchar(255),
        PRIMARY KEY (item_id)
        );
        
      CREATE TABLE IF NOT EXISTS PurchaseOrders (
        po_id serial,
        user_id integer,
        manufacturer_id integer,
        item_id integer,
        quantity integer,
        date_order varchar(255),
        date_received varchar(255),
        PRIMARY KEY (po_id),
        FOREIGN KEY (user_id) REFERENCES Users (user_id),
        FOREIGN KEY (manufacturer_id) REFERENCES Manufacturers (company_id),
        FOREIGN KEY (item_id) REFERENCES Items (item_id)
        );
        
      CREATE TABLE IF NOT EXISTS SalesOrders (
        so_id serial,
        user_id integer,
        customer_id integer,
        item_id integer,
        quantity integer,
        date_order varchar(255),
        date_received varchar(255),
        PRIMARY KEY (so_id),
        FOREIGN KEY (user_id) REFERENCES Users (user_id),
        FOREIGN KEY (customer_id) REFERENCES Customers (customer_id),
        FOREIGN KEY (item_id) REFERENCES Items (item_id)
        );	  
    `)
  } catch (error) {
    console.log(error)
  }
}


module.exports = {
  pool, 
  createTables
}