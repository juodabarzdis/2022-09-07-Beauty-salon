import express from "express";
import db from "../database/connect.js";
import { servicesValidator } from "../middleware/validate.js";
import { adminAuth } from "../middleware/auth.js";

const Router = express.Router();

Router.get("/", async (req, res) => {
  const options = {
    include: {
      // include related table
      model: db.Saloons,
      attributes: ["name"],
    },
  };

  if (req.query.saloonId) {
    options.where = {
      saloonId: req.query.saloonId,
    };
  }

  try {
    const services = await db.Services.findAll(options);
    res.json(services);
  } catch (error) {
    console.log(error);
    res.status(500).send("Įvyko klaida gaunant duomenis");
  }
});

Router.get("/:id", adminAuth, async (req, res) => {
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

Router.post("/new", adminAuth, servicesValidator, async (req, res) => {
  try {
    await db.Services.create(req.body);
    res.send("Paslauga sėkmingai sukurta");
  } catch (error) {
    console.log(error);
    res.status(500).send("Įvyko klaida sukuriant paslaugą");
  }
});

Router.put("/edit/:id", adminAuth, servicesValidator, async (req, res) => {
  try {
    const service = await db.Services.findByPk(req.params.id);
    await service.update(req.body);
    res.send("Paslauga sėkmingai atnaujinta");
  } catch (error) {
    console.log(error);
    res.status(500).send("Įvyko klaida");
  }
});

Router.delete("/delete/:id", adminAuth, async (req, res) => {
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
