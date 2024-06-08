import express from "express";
import pg from 'pg'
import bodyParser from 'body-parser';
import cors from"cors"
const port = 5000;

const app = express();
app.use(cors());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(express.json());

const db= new pg.Client({
    user:"postgres",
    password:"319be2a7",
    database:"pernTodo",
    host:"localhost",
    port:5432
});

db.connect();

//Routes

// Create a todo

app.post("/todos",async (req,res)=>{
     try {
        const newTodo = await db.query(`INSERT INTO todo(description) VALUES ($1) RETURNING *`,[req.body.description]);
        res.json(newTodo.rows[0]);
     } catch (err) {
        console.error(err.message);
     }
})

//get all the todos

app.get("/todos",async (req,res)=>{
    try {
        const data = await db.query("SELECT * FROM todo");
        res.json(data.rows);
    } catch (err) {
        console.error(err.message);
    }
})

//get a todo

app.get("/todos/:id",async (req,res)=>{
    try {
        const todo= await db.query("SELECT * FROM todo WHERE id = $1",[req.params.id]);
        res.json(todo.rows[0]);
    } catch (err) {
        console.error(err.message);
    }
})

//update a todo
app.put("/todos/:id",async (req,res)=>{
    try {
        const todo = await db.query("UPDATE todo SET description = $1 WHERE id = $2 RETURNING *",[req.body.description , req.params.id]);
        res.json("Todo was updated");
    } catch (err) {
        console.error(err.message);
        
    }
});

//DELETING A TODO

app.delete("/todos/:id",async(req,res)=>{
    try {
        await db.query("DELETE FROM todo WHERE id = $1",[req.params.id]);
        res.json("todo was deleted");
    } catch (err) {
    console.error(err.message);        
    }
})

app.listen(port , ()=>{
    console.log("Server started on port 5000")
});