import express from "express"

import {create, deleteUser, getAllUsers, getUserById, update} from "../controller/userController.js"

const route= express.Router();

//  add 'user'
route.post("/user", create);

//  retrieve 'users'
route.get("/users", getAllUsers);

route.get("/user/:id", getUserById);

//  update -> PUT
route.put("/update/user/:id", update)

// delete -> DELETE
route.delete("/delete/user/:id", deleteUser);


export default route;


// "When you receive a POST request directed at the /user path, 
// please execute the code inside the create function to handle it."

/*

const route= express.Router();

route.post('/user', create);

*/