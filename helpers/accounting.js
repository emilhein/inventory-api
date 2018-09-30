'use strict'

const getBoughtItems = items => items.filter(item => item.type === 'buy')
const getSoldItems = items => items.filter(item => item.type === 'sell')
const sumQuantity = (total, item) => total + parseInt(item.quantity)
const sumPrice = (total, item) => total + parseInt(item.quantity) * parseFloat(item.item_cost)
const getSoldItemsBeforeDate = (items, date) => getSoldItems(items).filter(item => new Date(item.date) <= new Date(date))
const getBougthItemsBeforeDate = (items, date) => getBoughtItems(items).filter(item => new Date(item.date) <= new Date(date))

const getTotalQuantityInInventory = items => {
    let addeditemsTotal = getBoughtItems(items).reduce(sumQuantity, 0)
    let soldItemsTotal = getSoldItems(items).reduce(sumQuantity, 0);
    return addeditemsTotal - soldItemsTotal
}

// With a FIFO approach i will assume that the remaining stock has the value the oldest inventory
// We assume the comapny starts with an inventory of 0
const getInventoryValueByDate = (items, date) => {
    let FIFOInventoryLeft = []
    let sold = []

    // All the items bougth before the date
    let allItemsBought = getBougthItemsBeforeDate(items, date) //

    // The company sold a total of items: 
    const soldItemsQtyBeforeDate = getSoldItemsBeforeDate(items, date).reduce(sumQuantity, 0) //
    console.log('TOTAL sold ITEMS: ', soldItemsQtyBeforeDate);

    allItemsBought.forEach(bougthItems => {
        let soldCount = sold.reduce(sumQuantity, 0)
        console.log('We have a sum of sold items: ', soldCount);
        if (soldCount <= soldItemsQtyBeforeDate) {
            let missingToHaveCountedAllSold = soldItemsQtyBeforeDate - soldCount
            if (missingToHaveCountedAllSold <= 0) {
                FIFOInventoryLeft.push(bougthItems)
                return
            }
            let batchCount = bougthItems.quantity
            if (batchCount >= missingToHaveCountedAllSold) {
                let quantityLeft = bougthItems
                quantityLeft.quantity = batchCount - missingToHaveCountedAllSold
                FIFOInventoryLeft.push(quantityLeft)
                bougthItems.quantity = missingToHaveCountedAllSold
            }
            sold.push(bougthItems)
        } else {
            FIFOInventoryLeft.push(bougthItems)
        }
    });

    return {
        inventoryItems: FIFOInventoryLeft,
        inventoryValue: FIFOInventoryLeft.reduce(sumPrice, 0),
        soldItems: sold,
        soldValue: sold.reduce(sumPrice, 0)

    }
}

module.exports = {
    getInventoryValueByDate,
    getTotalQuantityInInventory,
    getSoldItemsBeforeDate,
    getBougthItemsBeforeDate
}

// console.log(getTotalQuantityInInventory(allItems));
// console.log(getSoldItemsBeforeDate(allItems, '2018-01-05'));
// console.log(getBougthItemsBeforeDate(allItems, '2018-01-05'));
// console.log(getInventoryStockCount(allItems, '2018-01-11'));
// console.log(getInventoryValueByDate(allItems, '2018-01-11'));