import express from "express";
import db from "../database/connect.js";
import upload from "../middleware/multer.js";
import { workersValidator } from "../middleware/validate.js";

const Router = express.Router();

Router.get("/", async (req, res) => {
  try {
    const workers = await db.Services.findAll();
    res.json(workers);
  } catch (error) {
    console.log(error);
    res.status(500).send("Įvyko klaida gaunant darbuotojų duomenis");
  }
});

Router.post(
  "/new",
  upload.single("photo"),
  workersValidator,
  async (req, res) => {
    try {
      if (req.file) {
        req.body.photo = "/uploads/" + req.file.filename;
      }
      await db.Workers.create(req.body);
      res.send("Darbuotojas sėkmingai pridėtas");
    } catch (error) {
      console.log(error);
      res.status(500).send("Įvyko klaida pridedant darbuotoją");
    }
  }
);

Router.put(
  "/edit/:id",
  upload.single("photo"),
  workersValidator,
  async (req, res) => {
    try {
      if (req.file) req.body.photo = "/uploads/" + req.file.filename;

      const worker = await db.Workers.findByPk(req.params.id);
      await worker.update(req.body);
      res.send("Darbuotojo duomenys sėkmingai atnaujinti");
    } catch (error) {
      console.log(error);
      res.status(500).send("Įvyko klaida");
    }
  }
);

Router.delete("/delete/:id", async (req, res) => {
  try {
    const worker = await db.Workers.findByPk(req.params.id);
    await worker.destroy();
    res.send("Darbuotojas sėkmingai ištrintas");
  } catch (error) {
    console.log(error);
    res.status(500).send("Įvyko klaida ištrinant darbuotoją");
  }
});

export default Router;