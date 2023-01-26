const express = require('express');
const app = express(); 
const port = 8083;  

const { swaggerServe, swaggerSetup } = require('./config')
  
app.get("/",(res,resp)=>{ 
    resp.send('results'); 
});

app.use("/api-docs", swaggerServe, swaggerSetup); 

app.listen(port,()=>{
    console.log(`App is listening at http://localhost:${port}`);
})
 

 