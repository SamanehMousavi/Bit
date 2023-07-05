require("dotenv").config();
const { MONGO_URI } = process.env;
const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const { MongoClient } = require("mongodb");

const batchImport = async () => {
  const client = new MongoClient(MONGO_URI, options);
  try {
    await client.connect();
    const db = client.db("FinalProject");
    const result = await db.collection("Users").insertOne({
      _id: "user_id",
      username: "user_name",
      email: "user_email",
      lists: {
        "04/07/2023": {
          shareWith: ["user1", "user2", "user3"],
          task: [{ id: 1, description: "task_description", completed: false }],
        },
      },
    });
    console.log({
      result: `${result.insertedCount} documents inserted `,
      message: "Successful",
    });
  } catch (error) {
    console.error(error);
  }
  client.close();
};

batchImport();
