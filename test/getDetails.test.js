const expect = require("chai").expect;
const fs = require('fs')
const {
    saveFile
} = require('../db/items')
const file = fs.readFileSync('./db_seed.json', 'utf8')
const {
    getInventoryValueByDate,
    getTotalQuantityInInventory
} = require('../helpers/accounting')

const getRequest = require('../items/list')

const EXPECTEDSOLDVALUE = 3875
const EXPECTEDINVENTORYVALUE = 3750
const INVENTORYQUANTITY = 275

describe("The endpoint for getting the overview of the inventory", function () {
    saveFile(JSON.parse(file)) // to seed the "db"
    it("shuld return value of inventory and value of sold items", function () {
        getRequest.list('', '', (err, response) => {
            let list = JSON.parse(response.body)
            let InventoryCount = getTotalQuantityInInventory(list)
            let overview = getInventoryValueByDate(list, '2018-01-11')
            expect(overview.soldValue).to.equal(EXPECTEDSOLDVALUE);
            expect(overview.inventoryValue).to.equal(EXPECTEDINVENTORYVALUE);
            expect(InventoryCount).to.equal(INVENTORYQUANTITY);

        })
    });
});


describe("The endpoint for getting the overview of the inventory with added items", function () {
    it("shuld return value of inventory and value of sold items", function () {
        getRequest.list('', '', (err, response) => {
            let list = JSON.parse(response.body)
            list.push({
                "date": "2018-01-06",
                "quantity": "100",
                "item_cost": "50",
                "type": "buy",
                "id": 7
            })
            let InventoryCount = getTotalQuantityInInventory(list)
            let overview = getInventoryValueByDate(list, '2018-01-11')
            expect(overview.soldValue).to.equal(EXPECTEDSOLDVALUE);
            expect(overview.inventoryValue).to.equal(EXPECTEDINVENTORYVALUE + 5000);
            expect(InventoryCount).to.equal(INVENTORYQUANTITY + 100);

        })
    });
});