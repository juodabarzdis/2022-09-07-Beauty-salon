import express from "express";
import db from "../database/connect.js";
import { saloonsValidator } from "../middleware/validate.js";

const Router = express.Router();

Router.post("/new", saloonsValidator, async (req, res) => {
  try {
    await db.Saloons.create(req.body);
    res.send("Salonas sėkmingai sukurtas");
  } catch (error) {
    console.log(error);
    res.status(500).send("Įvyko klaida sukuriant saloną");
  }
});

Router.get("/", async (req, res) => {
  try {
    const saloons = await db.Saloons.findAll();
    res.json(saloons);
  } catch (error) {
    console.log(error);
    res.status(500).send("Įvyko klaida gaunant duomenis");
  }
});

Router.get("/:id", async (req, res) => {
  try {
    const saloon = await db.Saloons.findByPk(req.params.id);
    res.json(saloon);
  } catch (error) {
    console.log(error);
    res.status(500).send("Įvyko klaida gaunant duomenis");
  }
});

Router.put("/edit/:id", saloonsValidator, async (req, res) => {
  try {
    const saloon = await db.Saloons.findByPk(req.params.id);
    await saloon.update(req.body);
    res.send("Salonas sėkmingai atnaujintas");
  } catch (error) {
    console.log(error);
    res.status(500).send("Įvyko klaida");
  }
});

Router.delete("/delete/:id", async (req, res) => {
  try {
    const saloon = await db.Saloons.findByPk(req.params.id);
    await saloon.destroy();
    res.send("Salonas sėkmingai ištrintas");
  } catch (error) {
    console.log(error);
    res.status(500).send("Įvyko klaida ištrinant saloną");
  }
});

export default Router;
