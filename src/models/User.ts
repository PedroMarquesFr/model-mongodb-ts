import connection from "./connection";
import {ObjectId } from "mongodb";

function User() {
  const createFullName = ({ id, firstName, middleName, lastName }) => {
    const fullName = [firstName, middleName, lastName]
      .filter((name) => name)
      .join(" ");
    return {
      id,
      firstName,
      middleName,
      lastName,
      fullName,
    };
  };
  const serialize = ({ id, first_name, last_name, email, password }) => ({
    id,
    firstName: first_name,
    lastName: last_name,
    email,
    password,
  });
  return {
    create: async function (
      first_name: string,
      last_name: string,
      email: string,
      password: string
    ) {
      return connection().then((db) =>
        db
          .collection("users")
          .insertOne({ first_name, last_name, email, password })
      );
    },
    getAll: async function () {
      return connection().then((db) => db.collection("users").find().toArray());
    },
    getById: async function (id: string) {
      return connection().then((db) =>
        db.collection("users").findOne({ _id: new ObjectId(id) })
      );
    },
    update: async function (
      id: string,
      first_name: string,
      last_name: string,
      email: string,
      password: string
    ) {
      return connection().then((db) =>
        db
          .collection("users")
          .updateOne(
            { _id: new ObjectId(id) },
            { $set: { first_name, last_name, email, password } }
          )
      );
    },
    delete: async function (id: string) {
      return connection().then((db) =>
        db.collection("users").deleteOne({ _id: new ObjectId(id) })
      );
    },
    isValid: function (
      firstName: string,
      lastName: string,
      email: string,
      password: string
    ) {
      if (!firstName || typeof firstName !== "string") return false;
      if (!lastName || typeof lastName !== "string") return false;
      if (!email || typeof email !== "string") return false;
      if (!password || typeof password !== "string") return false;
      return true;
    },
  };
}

export default User;
