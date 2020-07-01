const express = require('express')
const bodyParser = require('body-parser')
var multer = require('multer');
var upload = multer();
const app = express()
const port = 3001

let allowCrossDomain = function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', '*');
  res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE');
  next();
}

const logger = function (req, res, next) {
  console.log(`${req.method} ${req.url}`);
  next()
}

// CORS Errors
app.use(allowCrossDomain);

// Log requests
app.use(logger)

app.use(bodyParser.json());
app.use(upload.array());
app.use(bodyParser.urlencoded(
  { 
    extended: true 
  }
));


const db_users = require('./queries/user-queries')
const db_manufacturers = require('./queries/manufacturers-queries')
const db_customers = require('./queries/customer-queries')
const db_items = require('./queries/items-queries')
const db_sales_orders = require('./queries/sales-orders-queries')
const db_purchase_orders = require('./queries/purchase-orders-queries')

app.get('/users', db_users.getUsers)
app.get('/users/:id', db_users.getUserById)
app.post('/users', db_users.createUser)
app.put('/users/:id', db_users.updateUserById)
app.delete('/users/:id', db_users.deleteUserById)

app.get('/manufacturers', db_manufacturers.getManufacturers)
app.get('/manufacturers/:id', db_manufacturers.getManufacturerById)
app.post('/manufacturers', db_manufacturers.createManufacturer)
app.put('/manufacturers/:id', db_manufacturers.updateManufacturerById)
app.delete('/manufacturers/:id', db_manufacturers.deleteManufacturerById)

app.get('/customers', db_customers.getCustomers)
app.get('/customers/:id', db_customers.getCustomerById)
app.post('/customers', db_customers.createCustomer)
app.put('/customers/:id', db_customers.updateCustomerById)
app.delete('/customers/:id', db_customers.deleteCustomerById)

app.get('/items', db_items.getItems)
app.get('/items/:id', db_items.getItemById)
app.post('/items', db_items.createItem)
app.put('/items/:id', db_items.updateItemById)
app.delete('/items/:id', db_items.deleteItemById)

app.get('/sales_orders', db_sales_orders.getSalesOrders)
app.get('/sales_orders/:id', db_sales_orders.getSalesOrderById)
app.post('/sales_orders', db_sales_orders.createSalesOrder)
app.put('/sales_orders/:id', db_sales_orders.updateSalesOrderById)
app.delete('/sales_orders/:id', db_sales_orders.deleteSalesOrderById)

app.get('/purchase_orders', db_purchase_orders.getPurchaseOrders)
app.get('/purchase_orders/:id', db_purchase_orders.getPurchaseOrderById)
app.post('/purchase_orders', db_purchase_orders.createPurchaseOrder)
app.put('/purchase_orders/:id', db_purchase_orders.updatePurchaseOrderById)
app.delete('/purchase_orders/:id', db_purchase_orders.deletePurchaseOrderById)

app.listen(port, () => {
  console.log(`App running on port ${port}.`)
})