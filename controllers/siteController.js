const site = require("../routes/site");

const Customer = require("../models/customer");
const Item = require("../models/item");
const Sales = require("../models/sales");

exports.getHome = async (req, res, next) => {
    let cust = await Customer.fetchAll();
    let item = await Item.fetchAll();
    let sale = await Sales.getMonthly();

    res.render('home', {
        from: 'home',
        customers: cust[0].slice(0, 5),
        items: item[0].slice(0, 5),
        sales: sale[0].slice(0, 5)
    })
}

exports.getCustomers = (req, res, next) => {
    Customer.fetchAll()
        .then((rows, data) => {
            // console.log("Rows = "); console.log(rows);
            res.render('customers/showCustomers', {
                from: 'showCustomers',
                customers: rows[0]
            })
        })
}

exports.getItems = (req, res, next) => {
    Item.fetchAll()
        .then((rows, data) => {
            // console.log("Rows = "); console.log(rows);
            res.render('items/showItems', {
                from: 'showItems',
                items: rows[0]
            })
        })
}

exports.getSales = (req, res, next) => {
    Sales.fetchAll()
        .then((rows, data) => {
            // console.log("Rows = "); console.log(rows);
            res.render('sales/showSales', {
                from: 'showSales',
                sales: rows[0]
            })
        })
}

exports.postaddCustomer = (req, res, next) => {
    res.render('customers/addCustomer',
        {
            title: 'Add New Customer',
            subtitle: 'Please fill out form below.',
            nameLabel: 'Customer Name',
            emailLabel: 'Customer Email',
            from: 'addCustomer'
        })
}

exports.postNewCustomer = (req, res, next) => {
    let name = req.body.customerName;
    let email = req.body.customerEmail;
    // console.log(name); console.log(email);
    const customer = new Customer(name, email);
    customer.save()
        .then(res.redirect('/customers'));
}

exports.getUpdateCustomer = (req, res, next) => {
    let id = req.params.id;
    // console.log("Cus ID: " + id);
    Customer.findByID(id)
        .then ((rows, fieldData) => {
            res.render('customers/customerUpdateForm', {
                cusID: `[ID: ${id}]`,
                id: rows[0].id,
                subtitle: 'Modify customer entry below.',
                nameLabel: 'Customer Name',
                emailLabel: 'Customer Email',
                from: 'customerUpdateForm',
                customer: rows[0][0]
            })
        }).catch(err => {
        console.log("Task Failed... Database Fetch Error => " + err);
    })
}

exports.postUpdateCustomer = (req, res, next) => {
    let id = req.body.customerID;
    let name = req.body.customerName;
    let email = req.body.customerEmail;
    // console.log(`id: ${id} name:${name} email:${email}`);
    const customer = new Customer(name, email);
    customer.update(id).then((rows, fieldData) => {
        res.redirect('/customers');
    }).catch(err => {
        console.log("Task Failed... Database POST Error => " + err);
    })
}

exports.postaddItem = (req, res, next) => {
    res.render('items/addItem',
        {
            title: 'Add New Item',
            subtitle: 'Please fill out form below.',
            nameLabel: 'Item Name',
            priceLabel: 'Item Price',
            from: 'addItem'
        })
}

exports.postNewItem = (req, res, next) => {
    let name = req.body.itemName;
    let price = req.body.itemPrice;
    // console.log(name); console.log(price);
    const item = new Item(name, price);
    item.save()
        .then(res.redirect('/items'));
}