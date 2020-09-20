# Food-Ordering-API

### Description
To provide functionality for [food order application frontend](https://github.com/Billywern/Food-Ordering-Application) to view available orders, place orders and view order that has been placed.

### Overview
This service is built using these framework and packages as shown below,

[Express](http://expressjs.com/)
* A node js web application framework that providess API with HTTP utility method and middlewares.

[Typescript](https://www.typescriptlang.org/)
* Provides typing for Javascript which helps to save some time to find the error and easier development due to strong typings.

[ts-node](https://www.npmjs.com/package/ts-node)
* Help to execute scripts ts in file.

[csvtojson](https://www.npmjs.com/package/csvtojson)
* To read csv data and convert it to json format. This helps to read the restaurants in csv file.

[Moment](https://momentjs.com/)
* One of the alternative to using [date](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date) to set complex time format, time zones and provide more built in functionality such as comparing time, etc.

[Nodemon](https://nodemon.io/)
* A utility that will monitor for any development changes that was made and restart the server automatically, if needed.

[UUID](https://www.npmjs.com/package/uuid)
* To generate unique Id.

### Structure

**database**
* By right, this will be the database logic for us to perform grab, update, delete, and other kind of methods on the data that was stored. For this case, it will just contain the json files that was converted from csv for the server to read.

**resource**
* Used to store scripts and the `data.csv`, can also be used for the infra level where it stores build, deployment plan.

**src/constant**
* Stores the model of the data retrieved from the database.

**src/controllers**
* To provide HTTP method for front end to interact with this service.

**src/usecase**
* Stores business logic and able to interact with the database.

### How to setup?

Assuming that you have clone the repo, follow this simple step to run the project.
```
npm install

npm run start
```
If you want to change the port number, feel free to change it at `Food-Ordering-API\index.ts`

Once setup, you are able to consume it and interact with it through [here](https://github.com/Billywern/Food-Ordering-Application) or [Postman](https://www.postman.com/) or any other kind of API platform that you can find.
