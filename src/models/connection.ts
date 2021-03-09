import { MongoClient } from "mongodb";

const MONGO_DB_URL = "mongodb://127.0.0.1:27017";

const connection = () => {
  return MongoClient.connect(process.env.DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
    .then((conn) => conn.db(process.env.DB_NAME))
    .catch((err) => {
      console.error(err);
      process.exit(1);
    });
};

export default connection;
