const mongoose = require("mongoose");

const Info_clusterSchema = new mongoose.Schema({
  Title: {
    type: String,
    required: true,
  },
  // Schema: {
  //   type: Array,
  //   required: true,
  // },
  Schema: [{
    Field_Name: String,
    Field_Type: String
  }],
  createdAt: {
    type: Date,
    default: Date.now,
  },
  public: {
    type: Boolean,
    default: true
  },
});

//testing


module.exports = mongoose.model("Info_cluster", Info_clusterSchema);

