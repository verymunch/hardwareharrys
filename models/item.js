const db = require("../util/database");

module.exports = class Item {
    constructor(name, price) {
        this.ItemName = name;
        this.ItemPrice = price;
    }
    save() {
        return db.execute(
            "INSERT INTO Item (ItemName, ItemPrice)" +
            'values (?, ?)',
            [this.ItemName, this.ItemPrice]
        )
    }
    static fetchAll() {
        return db.execute(
        "SELECT\n" +
        "i.ItemName,\n" +
        "CONCAT('$', FORMAT(COALESCE(SUM(i.ItemPrice * s.Quantity), 0.00), 2)) AS TotalSales\n" +
        "FROM Item i\n" +
        "LEFT JOIN Sales s ON i.ItemID = s.ItemID\n" +
        "GROUP BY i.ItemName\n" +
        "ORDER BY SUM(i.ItemPrice * s.Quantity) DESC\n"
        );
    }
}