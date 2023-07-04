const mongoose = require("mongoose");

const DB =
  "mongodb+srv://hasnain6613:hasnain123@cluster0.nxussix.mongodb.net/?retryWrites=true&w=majority";

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Server Started Successfully!"))
  .catch((error) => console.log(error.message));
