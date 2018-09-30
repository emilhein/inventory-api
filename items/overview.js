'use strict';
const { getAllItems } = require('../db/items')
const { getInventoryValueByDate } = require('../helpers/accounting')
module.exports.get = (event, context, callback) => {
    const date = event.pathParameters.endDate

    if (new Date(date).toString() === 'Invalid Date') {
        console.error('Validation Failed');
        callback(null, {
            statusCode: 400,
            headers: {
                'Content-Type': 'text/plain'
            },
            body: 'Couldn\'t Get your info.',
        });
        return;
    }
    let allItems = getAllItems()
    let overview = getInventoryValueByDate(allItems, date)
    const response = {
        statusCode: 200,
        body: JSON.stringify(overview),
    };
    callback(null, response);
};