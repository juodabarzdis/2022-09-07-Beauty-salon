// This is: Database connection scheme

import { Sequelize } from "sequelize";
import mysql from "mysql2/promise";
import {
  Users,
  Saloons,
  Services,
  Workers,
  Ratings,
  Orders,
} from "../model/index.js";

const database = {};

// per egza keiciam tik credentials
const credentials = {
  host: "localhost",
  user: "root",
  password: "",
  database: "beauty_parlor", // database name
};

// Connection to MySQL database
try {
  const connection = await mysql.createConnection({
    host: credentials.host,
    user: credentials.user,
    password: credentials.password,
  });

  // Create database
  await connection.query(
    "CREATE DATABASE IF NOT EXISTS " + credentials.database
  );

  // Use database
  const sequelize = new Sequelize(
    credentials.database,
    credentials.user,
    credentials.password,
    {
      dialect: "mysql",
    }
  );

  // Create tables

  database.Users = Users(sequelize);
  database.Saloons = Saloons(sequelize);
  database.Services = Services(sequelize);
  database.Workers = Workers(sequelize);
  database.Ratings = Ratings(sequelize);
  database.Orders = Orders(sequelize);

  // Create relationships

  database.Saloons.hasOne(database.Workers);
  database.Workers.belongsTo(database.Saloons);

  database.Saloons.hasMany(database.Services);
  database.Services.belongsTo(database.Saloons);

  database.Users.hasMany(database.Orders);
  database.Orders.belongsTo(database.Users);

  database.Services.hasOne(database.Orders);
  database.Orders.belongsTo(database.Services);

  database.Users.hasOne(database.Ratings);
  database.Ratings.belongsTo(database.Users);

  database.Workers.hasMany(database.Ratings);
  database.Ratings.belongsTo(database.Workers);

  database.Workers.hasMany(database.Orders);
  database.Orders.belongsTo(database.Workers);

  database.Orders.hasOne(database.Ratings);
  database.Ratings.belongsTo(database.Orders);

  // Sync database

  await sequelize.sync({ alter: true });
} catch {
  console.log("Error connecting to database");
}

export default database;
