const app = require("./app");
const mongoose = require("mongoose");
const port = process.env.PORT || 9000;

app.listen(port, () => {
  console.log(`app running on ${port}`);
});
const db = process.env.DB;
mongoose.connect(db).then(() => console.log("db connected successfully"));
