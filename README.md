
# LitFair-Server
 

# Table of contents
- [Project Title](#LitFair-Server)
- [Prerequisite](#prerequisite)
- [Table of contents](#table-of-contents)
- [Installation](#installation)
- [Services documentation](#Services-documentation)
# prerequisite

  

 1. [x] Nodejs
 2. [x]  SQL  
 3. [x]  .env file

# Installation
[(Back to top)](#table-of-contents)

 

- After cloneing the repo open the folder in cmd and run the following command to  install all third part bakages 

		> npm i


 - Create .env file  which have to include important parametarts :
	 - PORT
 
	 it should be like that :
		 
		> PORT=3000
- Create SQL Database and name it   *sequelizedb* 



### Finally to run the server 
	npm run devServer 
	
	
	
# Services documentation

| **Service** |
| --- |
| [User](##User) |

## User 
### This service is for add new users "either by google or normal sign up", provide authentication, and set JWT 

## Routes :
| **URL** | **Type** |
| --- | --- |
| [/adduser](###/adduser) | post |

### /adduser
For add new user as a seeker the request body should contain the next values

| **Field** | **Description** |
| --- | --- |
| email | required and unique |
| password | required |
| role | either "Seeker" or "Company" |
| fname | required for seekers |
| lname | required for seek

