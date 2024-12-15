import { configDotenv } from "dotenv";
import connectDB from "./db/index.js";
import { app } from "./app.js";

configDotenv({
  path: "./.env"
});

connectDB().then(()=>{
  app.on("error", (error)=>{
    console.error(error, "Error occured");
    throw error;
  });
  app.listen(process.env.PORT || 8000, ()=>{
    console.log(`Server is running on port ${process.env.PORT} || 8000`);
  });
}).catch(error=>{
  console.error(`DB Connection Error: ${error}`);
})