const expect = require("chai").expect;
const fs = require('fs')
const {
    saveFile
} = require('../db/items')
const file = fs.readFileSync('./db_seed.json', 'utf8')
saveFile(JSON.parse(file))

const getRequest = require('../items/list')



describe("Get endpoint for returning all items", function () {
    it("should return a list", function () {
        getRequest.list('', '', (err, response) => {
            let list = JSON.parse(response.body)
            expect(list.length).to.equal(6);
        })
    });
});