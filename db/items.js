'use strict'
var fs = require('fs');
let fileName = 'item_db.json'


const addItem = item => {
    let allItems = getAllItems()
    let id= allItems.length
    item.id = id+1
    allItems.push(item)
    saveFile(allItems)
}

const saveFile = file => {
    fs.writeFile(`./${fileName}`, JSON.stringify(file), (err) => {
        if (err) {
            return console.log(err);
        }
        console.log("The file was saved!");
    });
}

const getAllItems = () => {
    try {
        let file = fs.readFileSync(`./${fileName}`, 'utf8')
        return JSON.parse(file)
    } catch (error) {
        throw err;

    }
}

module.exports = {
    addItem,
    getAllItems,
    saveFile
}