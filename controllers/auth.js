import fs from "fs";
import generateId from "../services/generateId.js";
import writeToFile from "../services/writeToFile.js";

export const signUp = async (req, res, next) => {
  try {
    //RECEIVING DATA FROM THE BODY OF THE REQUEST
    const { email, password } = req.body;
    //READING THE JSON DATABASE FILE
    const data = fs.readFileSync(global.mock_db);
    //PARSING THE JSON DATABASE FILE DATA
    const jsonData = JSON.parse(data);
    //QUERYING FOR USERS' COLLECTION IN THE DATABASE
    const { users } = jsonData;
    //CHECKING IF USER ALREADY EXISTS
    const existingUser = users.find((user) => user.email === email);
    if (existingUser) {
      res.status(400).json("This user already exists");
    }
    //CREATING A NEW USER
    const newUser = {
      id: generateId(),
      email,
      password,
    };
    //ADDING NEW USER TO THE DATABASE
    users.push(newUser);
    //WRITING TO/SAVING CHANGES IN THE DATABASE
    await writeToFile(global.mock_db, jsonData);
    //SENDING SUCCESS RESPONSE
    res.status(201).json({ message: "Welcome to the fam brotha!", newUser });
    next();
  } catch (err) {
    //ERROR HANDLING
    console.error(err);
    res.status(500).json("Internal Server Error");
  }
};
export const login = async (req, res, next) => {
  try {
    //RECEIVING DATA FROM THE BODY OF THE REQUEST
    const { email, password } = req.body;
    //READING THE JSON DATABASE FILE
    const data = fs.readFileSync(global.mock_db);
    //PARSING THE JSON DATABASE FILE DATA
    const jsonData = JSON.parse(data);
    //QUERYING FOR USERS' COLLECTION IN THE DATABASE
    const { users } = jsonData;
    //SEARCHING FOR USER WITH REQUESTED EMAIL
    const existingUser = users.find((user) => user.email === email);
    if (!existingUser) {
      //IF USER WITH REQUESTED EMAIL NOT FOUND
      res.status(404).json("User not found");
      return;
    }
    const isPasswordsMatch = existingUser.password === password;
    if (existingUser && isPasswordsMatch) {
      //SENDING SUCCESS RESPONSE IF CREDENTIALS MATCH
      res
        .status(200)
        .json({ message: "Wassaap, welcome back brotha!", existingUser });
    } else {
      res.status(400).json("Credentials don't match!");
    }
    next();
  } catch (err) {
    //ERRO HANDLING
    console.error(err);
    res.status(500).json("Internal Server Error");
  }
};
