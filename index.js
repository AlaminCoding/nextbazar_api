const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const authRoute = require("./routes/auth");
const userRoute = require("./routes/users");
const productRoute = require("./routes/product_crud");
const categoryRoute = require("./routes/category_crud");
const app = express();
dotenv.config();

async function dbConnect() {
  await mongoose.connect(process.env.MONGO_URL);
  console.log("Databse Connected");
}
dbConnect().catch((err) => console.log(err));

app.use(express.json());
app.use("/auth", authRoute);
app.use("/user", userRoute);
app.use("/product", productRoute);
app.use("/category", categoryRoute);
app.listen(8000, () => {
  console.log("BackEnd Server is Running");
});
