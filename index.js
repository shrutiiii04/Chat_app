const express = require("express");
const mongoose = require("mongoose");
const app = express();
const PORT = 8090;
const path = require("path");
const methodOverride = require("method-override");

const Chat = require("./models/chat")

app.set("view enginee","ejs");
app.set("views",path.join(__dirname,"views"));
app.use(express.static(path.join(__dirname,"public")));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));

main().then((result)=>{console.log("mongoDb connected!!!")})
      .catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/letsChat');
}

//index route-> geting all chats
app.get("/chats", async(req,res)=>{
   let chats = await Chat.find();
   res.render("index.ejs",{chats});
});

//new chat
app.get("/chats/new",(req,res)=>{
    res.render("new.ejs");
})
app.post('/chat/new', async (req, res) => {
    try {
        const { from, msg, to } = req.body;
        const newChat = new Chat({ from: from, msg: msg,to: to ,created_at: new Date()});
        await newChat.save();
        res.redirect('/chats');
    } catch (err) {
        console.error('Error saving chat:', err);
        res.status(500).send('Internal Server Error');
    }
});

app.get("/",(req,res)=>{
    res.send("helloo");
});

//edit
app.get("/chats/:id/edit", async(req,res)=>{
    let {id} = req.params;
    let chat = await Chat.findById(id);
    res.render("edit.ejs",{ chat});
});
app.put("/chats/:id",async(req,res)=>{
    let {id} = req.params;
    let  {msg: newMsg} = req.body;
    let updatedchat= await Chat.findByIdAndUpdate(id,{msg:newMsg, created_at: new Date()},{ runValidators:true ,new:true});//updated
    res.redirect("/chats");
});

//DELETE CHAT
app.delete("/chats/:id",async(req,res)=>{
    let  {id} = req.params;
    await Chat.findByIdAndDelete(id);
    res.redirect("/chats");
});

app.listen(PORT,()=>{
    console.log("server connected sucessfully");
})