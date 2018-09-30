'use strict';
const {
    addItem
} = require('../db/items')

module.exports.create = (event, context, callback) => {
    const data = JSON.parse(event.body);
    if (typeof data.quantity !== 'string' || typeof data.date !== 'string' ||new Date(data.date).toString()  === 'Invalid Date') {
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

    addItem(data)
    const response = {
        statusCode: 200,
        body: JSON.stringify(data),
    };
    callback(null, response);
};