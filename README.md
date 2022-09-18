# LitFair-Backend

## Description
A Backend Server ( based on `node.js` and `express` framework) using `MongoDB & MySQL` as a database providers and `mongoose & Sequelize` as ODM & ORM.
LitFair is a  web-based platform enhances the recruiting process by providing solutions to job seekers to get the right job upon their skills and interests, the platform helps the hiring team by automating the recruiting process and suggesting best-fit candidates.


## Features
* Exchange AI model reports by `RabbitMQ`.
* Split application data in multi-database repositories `MongoDB & MySQL`.
* Authenticate and authorize users by `JWT token`.
* Each service is independent which together makes a scalable structure

## Installing
* Download the dependencies with `npm` package manager
```
$ npm install
```
## Executing program
* The website works on `http://localhost:process.env.PORT || 8080` OR by `nodemon` which is run in development mode with monitoring of debugging terminal.

>npm run scripts
```
"scripts": {
    "start": "node src/app.js",
    "jasmine": "npx jasmine",
    "lint": "eslint . --ext .js",
    "prettier": "prettier --config .prettierrc 'src' --write",
    "devServer": "nodemon src/app.js",
}
```
## Environment Variables 
> src/config/env.js
```
ENV
PORT                //port to running server on
DB_STRING           //general mysql connection url
company_SQLDB       //company mysql connection url
company_MongoDB     //company mongodb connection url
job_DB              //job mongodb connection url

// clouninary profile credentials 
cloudinary_name
cloudinary_api_key
cloudinary_api_secret

// rabbitMQ
MQ_URL                  //rabbitMQ connection url
PUBLISH_VIDEOMQ_NAME    //videos publisher queue name
CONSUME_VIDEOMQ_NAME    //videos subscriber queue
PUBLISH_CVMQ_NAME       //CVs publisher queue name
CONSUME_CVMQ_NAME       //CVs subscriber queue

//smtp_api sendinblue profile credentials 
SMTP_HOST
SMTP_PORT
SENDINBLUE_USER
SENDINBLUE_KEY

```

## Directory Structure

```
.
|_node_modules/
|_src
|    |_config
|    |_middelwares
|    |_services          #website is divided into small services
|    |    |_model.js
|    |    |_controllers.js            
|    |    |_routes.js
|    |    
|    |_utils
|    |
|    |app.js
|
|_receive.js            #subscriber rabbitMQ script to process AI reports
|_.env
|_.gitignore
|_package.json
|_README.md
|_LICENSE.md
```
