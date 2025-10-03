import express from "express";
import dotenv from 'dotenv';
import cors from "cors";

import notesRoutes from "./routes/notesRoutes.js";
import {connectDB}  from "./config/db.js";
import rateLimiter from "./middleware/rateLimiter.js";


dotenv.config();


const app = express();
const PORT = process.env.PORT || 5001

app.use(cors({
  origin: "http://localhost:5173"
})
);

app.use(express.json());
app.use(rateLimiter);


//app.use((req,res,next) => {
 // console.log(`Req method is ${req.method} and req url is ${req.url}`);
 // next();
 // });

app.use("/api/notes" , notesRoutes);

connectDB().then(()=> {
  
app.listen(PORT, () => {
    console.log("server started on PORT: ", PORT);

}); 
});


//app.get("/api/notes", (req,res) => {
    // send the notes 
  //  res.status(200).end("Namaste Bharat");
//});

//app.post("/api/notes", (req,res) => {
    //create a note 
  //  res.status(201).json({message:"your note has been Created"});
//});

//app.put("/api/notes/:id", (req,res) => {
    //create a note 
  //  res.status(201).json({message:"your note has been Created"});
//});

// localhost:5001/api/21

//app.delete("/api/notes/:id", (req,res) => {
    //create a note 
  //  res.status(201).json({message:"your note has been deleted"});
//});





