const mongoose = require("mongoose");
const Chat = require("./models/chat")

main().then((result)=>{console.log("mongoDb connected!!!")})
      .catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/letsChat');
}


//new chats
let allChats=[
    {
        from:"Harshal",
        to: "Viraj",
        msg: "Hello! Good morning!!",
        created_at: new Date(),
    },
    {
        from:"Shruti",
        to: "Shreya",
        msg: "Good morning!!",
        created_at: new Date(),
    },
    {
        from:"Harshal",
        to: "Srushti",
        msg: "All the best yaarrr!!!",
        created_at: new Date(),
    },
    {
        from:"Shreya",
        to: "Viraj",
        msg: "jevlas ka re???",
        created_at: new Date(),
    },
    {
        from:"Jyoti",
        to: "Reva",
        msg: "I like dogs",
        created_at: new Date(),
    },
    {
        from:"BOB",
        to: "Oggy",
        msg: "Kiti tejasvi log hai!!",
        created_at: new Date(),
    },
    {
        from:"Bheem",
        to: "Raju",
        msg: "Kya ladoo hai tumare pas?",
        created_at: new Date(),
    },
    {
        from:"Nobita",
        to: "Doremon",
        msg: "Doremon!!! meri madath karo",
        created_at: new Date(),
    },
    {
        from:"Tom",
        to: "Jerry",
        msg: "hee hee hee!!!!",
        created_at: new Date(),
    },
]
Chat.insertMany(allChats);