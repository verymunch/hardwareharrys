const db = require("../util/database");

module.exports = class Customer {
    constructor(name, email) {
        this.CustomerName = name;
        this.CustomerEmail = email;
    }
    save() {
        return db.execute(
            "INSERT INTO Customer (CustomerName, CustomerEmail)" +
            'values (?, ?)',
            [this.CustomerName, this.CustomerEmail]
        )
    }
    static fetchAll() {
        return db.execute(
            "SELECT\n" +
            "c.CustomerID,\n" +
            "c.CustomerName,\n" +
            "c.CustomerEmail,\n" +
            "CONCAT('$', FORMAT(COALESCE(SUM(i.ItemPrice * s.Quantity), 0.00), 2)) AS TotalSales\n" +
            "FROM Customer c\n" +
            "LEFT JOIN Sales s ON c.CustomerID = s.CustomerID\n" +
            "LEFT JOIN Item i ON s.ItemID = i.ItemID\n" +
            "GROUP BY c.CustomerID, c.CustomerName, c.CustomerEmail\n" +
            "ORDER BY SUM(i.ItemPrice * s.Quantity) DESC\n"
        );
    }
    static findByID(CustomerID) {
        return db.execute(
            "SELECT * FROM Customer WHERE CustomerID = ?",
            [CustomerID]
        );
    }
    update(CustomerID) {
        return db.execute(
            "UPDATE Customer SET CustomerName = ?, CustomerEmail = ? WHERE CustomerID = ?",
            [this.CustomerName, this.CustomerEmail, CustomerID]
        );
    }
}