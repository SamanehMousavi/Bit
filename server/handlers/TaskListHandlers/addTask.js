"use strict";

const { MongoClient } = require("mongodb");

require("dotenv").config();
const { MONGO_URI } = process.env;

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const addTask = async (request, response) => {
  const client = new MongoClient(MONGO_URI, options);
  const { date, user, input, index } = request.body;

  try {
    await client.connect();
    const db = client.db("FinalProject");

    const findUser = await db.collection("Users").findOne({ _id: user });
    // console.log(findUser);
    const newList = { ...findUser.lists };
    newList[date].task[index] = input;
    // console.log(newList[date].task);

    // if (!listData) {
    await db
      .collection("Users")
      .updateOne({ _id: user }, { $set: { lists: newList } });
    return response.status(200).json({ status: 200, message: "Updated List" });
    // } else {
    //   return response
    //     .status(200)
    //     .json({ status: 200, message: "User alreday logged in" });
    // }
  } catch (error) {
    response.status(500).json({ status: 500, message: error.message });
  } finally {
    client.close();
  }
};

module.exports = { addTask };
