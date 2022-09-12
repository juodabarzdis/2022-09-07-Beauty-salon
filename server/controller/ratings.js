import express from "express";
import db from "../database/connect.js";
import { ratingsValidator } from "../middleware/validate.js";

const Router = express.Router();

Router.post("/worker/:id", ratingsValidator, async (req, res) => {
  req.body.workerId = req.params.id;
  try {
    await db.Ratings.create(req.body);
    res.send("Įvertinimas sekmingai issaugotas");
  } catch (error) {
    console.log(error);
    res.status(500).send("Įvyko serverio klaida");
  }
});

export default Router;
