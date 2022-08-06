const express = require("express");
const app = express();
const path = require("path");
// Settign up the router
const PORT = process.env.PORT || 3334  //the number of our port

//web files (will search for index.htnl)
app.use(express.static(path.join(__dirname,"web")));


//attach client to request objest from the front-end
app.use(express.urlencoded({extended:true}));
app.use(express.json());


//Start server
app.listen(PORT, ()=>{
    console.log(`Listening on port ${PORT}`);
})


