# Books Manager Application

This application allows a user to add new books, show, update and delete existing books. 

The application consists of Web client made in React along with a Express based API server. The server interacts with data layer in form of a MongoDB instance. The GraphQL query language API is also being used to provide seamless and cached data to React Client.  

### Setting Up and Running

- Clone the  [repository](https://github.com/shantanutomar/books-manager.git).
- Install MongoDB in local and create a database - books-manager-db.
MongoDB connection string - 'mongodb://localhost:27017/books-manager-db'.
- Go to /server and Install all the required dependencies using  `npm install`.
- Go to /client and Install all the required dependencies using  `npm install`
- Go to /server and run the server instance using - nodemon. The server will run at port 3000.
- Go to /client and run the client instance using - npm start. If promoted for port change select Y and client will run on designated port.
- Hit the URL - http://localhost:[client-port]