import express from "express";
import db from "../database/connect.js";
import { servicesValidator } from "../middleware/validate.js";

const Router = express.Router();

Router.get("/", async (req, res) => {
  try {
    const services = await db.Services.findAll({
      include: {
        // include related table
        model: db.Saloons,
        attributes: ["name"],
      },
    });
    res.json(services);
  } catch (error) {
    console.log(error);
    res.status(500).send("Įvyko klaida gaunant duomenis");
  }
});

Router.get("/:id", async (req, res) => {
  try {
    const services = await db.Services.findByPk(req.params.id, {
      include: {
        // include related table
        model: db.Saloons,
        attributes: ["name"],
      },
    });
    res.json(services);
  } catch (error) {
    console.log(error);
    res.status(500).send("Įvyko klaida gaunant duomenis");
  }
});

Router.post("/new", servicesValidator, async (req, res) => {
  try {
    await db.Services.create(req.body);
    res.send("Paslauga sėkmingai sukurta");
  } catch (error) {
    console.log(error);
    res.status(500).send("Įvyko klaida sukuriant paslaugą");
  }
});

Router.put("/edit/:id", servicesValidator, async (req, res) => {
  try {
    const service = await db.Services.findByPk(req.params.id);
    await service.update(req.body);
    res.send("Paslauga sėkmingai atnaujinta");
  } catch (error) {
    console.log(error);
    res.status(500).send("Įvyko klaida");
  }
});

Router.delete("/delete/:id", async (req, res) => {
  try {
    const service = await db.Services.findByPk(req.params.id);
    await service.destroy();
    res.send("Paslauga sėkmingai ištrinta");
  } catch (error) {
    console.log(error);
    res.status(500).send("Įvyko klaida ištrinant paslaugą");
  }
});

export default Router;
