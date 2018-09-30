'use strict';
const {
    getAllItems, saveFile
} = require('../db/items')

module.exports.update = (event, context, callback) => {
    const data = JSON.parse(event.body);
    const id = event.pathParameters.id
    if (typeof data.quantity !== 'string') {
        console.error('Validation Failed');
        callback(null, {
            statusCode: 400,
            headers: {
                'Content-Type': 'text/plain'
            },
            body: 'Couldn\'t create the item.',
        });
        return;
    }
    let allItems = getAllItems()
    
    let itemToModify = allItems.find(item => item.id === id)
    itemToModify.quantity = data.quantity
    saveFile(allItems)
    const response = {
        statusCode: 200,
        body: JSON.stringify(itemToModify),
    };
    callback(null, response);
};