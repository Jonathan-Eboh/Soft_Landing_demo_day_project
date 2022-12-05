const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    // const conn = await mongoose.connect(process.env.DB_STRING, {
    //   useNewUrlParser: true,
    //   useUnifiedTopology: true,
    //   useFindAndModify: false,
    //   useCreateIndex: true,
    // });
    //const { db } = conn
    //console.log(conn);


    mongoose.connect(process.env.DB_STRING, (err, database) => {
      if (err) return console.log(err)
      global.db = database
      console.log(`MongoDB Connected:`, global.db);
      //db = database
      //require('./app/routes.js')(app, passport, db);
    });


  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

module.exports = connectDB;
