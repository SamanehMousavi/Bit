"use strict";

const { MongoClient } = require("mongodb");

require("dotenv").config();
const { MONGO_URI } = process.env;

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const addList = async (request, response) => {
  const list = request.body;

  const client = new MongoClient(MONGO_URI, options);

  try {
    await client.connect();
    const db = client.db("FinalProject");

    const resultUpdateItems = await db
      .collection("Users")
      .updateOne(query, newValues);

    if (!listData) {
      await db
        .collection("Users")
        .insertOne({ _id: user.email, username: user.name, email: user.email });
      return response.status(200).json({ status: 200, message: "New User" });
    } else {
      return response
        .status(200)
        .json({ status: 200, message: "User alreday logged in" });
    }
  } catch (error) {
    response.status(500).json({ status: 500, message: error.message });
  } finally {
    client.close();
  }
};

module.exports = { addUser };
