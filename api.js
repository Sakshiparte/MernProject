const mongoose =require("mongoose");
const conn_str="mongodb+srv://mern:mern@cluster0.r3qjwyu.mongodb.net/Ums?retryWrites=true&w=majority";

mongoose.connect(conn_str)
.then( () =>console.log("Connected sucessfully.."))
.catch((err) =>console.log(err))

const express =require("express");
const app= express();
const port=8989

const userdata =new mongoose.Schema({
name:String,
age:String,
city:String
});

const cors = require('cors')
app.use( cors())

const user=new mongoose.model(`users`,userdata);

//get data
app.get("/users",async (req,res)=>{
let data=await user.find();
res.send(data);
})

//get data by id
app.get("/users/:id",async(req,res)=>{
    let data=await user.find({_id: req.params['id']});
    res.send(data[0]);
    })

//delete data
app.delete("/users",async(req,res)=>{
    console.log("delete one...")
let d_data = await user.deleteOne({_id: req.query.id});
    res.send(d_data)
})


app.use(express.json())
// add /post data
app.post("/users", async (req, res) => {
	console.log(req.body)
	let u = new user(req.body);
	let result = await u.save();
	res.send(result);
});

//edit data
app.put("/users", async (req, res) => {
     console.log(req.body)
    let result = await user.updateOne({"_id":req.body.id},
    {
		"$set": {
			"name" : req.body.name,
			"age" : req.body.age,
			"city" : req.body.city
		}
	});

    res.send(result)
});


app.listen(port,()=>{
console.log(`Listenung on port ${port}`)
})