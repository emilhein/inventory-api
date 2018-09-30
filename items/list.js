'use strict';
const {
    getAllItems
} = require('../db/items')


module.exports.list = (event, context, callback) => {
    let items = getAllItems()
    const response = {
        statusCode: 200,
        body: JSON.stringify(items),
    };
    callback(null, response);
};