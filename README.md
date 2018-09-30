## Get started:

```js
run 'npm install serverless -g' // to install the servelress framework
run 'npm install' // install dependencies
run 'npm run dev' // start dev server

run 'npm test' // run the test suite
```
Now a server should be started up that you can connect to on localhost:3000

NOTE: the solution should be deployable by installing the serverless CLI and enter AWS (or another providers) credentials 

there are 4 endpoints:

1. localhost:3000/items GET request that returns all items
2. localhost:3000/items POST request that creates an new item - the body could look like this:
   {
   "date" : "2018-01-05",
   "quantity" : "150",
   "item_cost" : "50" // this only needs to be added if the type is of type = 'buy'
   "type" : "sell" // this can be set to 'sell' if the items were sold
   }

3. localhost:3000/items/{id} PUT request that changes the quantity of an item
4. localhost:3000/getdetails/${date} GET request, that summarizes the inventory for a given date
    - ex: localhost:3000/getdetails/2018-01-11



The implementation is done so simple, that it can easily be executed locally without the need of a connection to any database.
In a real world application i would prefer a database of some kind, but i found it more than sufficient to just use a json file, saved on the local hardrive in the root of the project. 

The initial items stored can be found in the "db_seed.json" file in the root of hte project.


When creating the endpoint for creating item i have not used too much energy on input validation as i would properbly do two different endpoint for creating a buy order vs a sell order, if i had more time. 
