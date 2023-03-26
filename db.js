const mongoose = require("mongoose"); // require mongoose connector

// const mongooseURI =  process.env.MONGO_DB_URL // string uri
const mongooseURI ="mongodb+srv://raihan:I6R3mcSl3tZNAQRf@cluster0.um4b1ys.mongodb.net/keep-note?retryWrites=true&w=majority"
//  connect To Mongo function
const connectToMongo = async () => {
  await mongoose
    .connect(mongooseURI)
    .then(console.log("Connected"))
    .catch(console.log("faild to connect!"));
};
//  export the modules
module.exports = connectToMongo;
