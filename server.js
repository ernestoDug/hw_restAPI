const app = require("./app");
// ******* 
// для підлючення до d/b 
const {DB_HOST, PORT = 3000} = process.env;
const mongoose = require("mongoose"); 

mongoose.set('strictQuery', true); 
mongoose 
  .connect(DB_HOST) 
  .then(() =>   {  
        // / ап лісен підняв 
        app.listen(PORT, () => { 
          console.log(`Server running. Use our API on port: ${PORT}`)
        }) 
        console.log("Database connection successful");
      }) 
      .catch(error => {console.log(error.message)
        // для завершення процессів
        process.exit(1);
            })
        // ************************* *

