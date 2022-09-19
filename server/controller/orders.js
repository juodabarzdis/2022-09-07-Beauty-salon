import express from "express";
import db from "../database/connect.js";
import upload from "../middleware/multer.js";
import { ordersValidator } from "../middleware/validate.js";

const Router = express.Router();

// Admino užsakymų sąrašas
Router.get("/", async (req, res) => {
  try {
    const orders = await db.Orders.findAll({
      include: [
        { model: db.Users, attributes: ["first_name", "last_name"] },
        { model: db.Services, attributes: ["name"] },
      ],
    });
    res.json(orders);
  } catch (error) {
    console.log(error);
    res.status(500).send("Įvyko klaida gaunant užsakymų duomenis");
  }
});

// Vartotojo užsakymai
Router.get("/user/", async (req, res) => {
  // Laikinai darome statinį vartotojo id
  const userId = 1;
  try {
    const orders = await db.Orders.findAll({
      where: { userId: userId },
      //   req.session.userId
    });
    res.json(orders);
  } catch (error) {
    console.log(error);
    res.status(500).send("Įvyko klaida gaunant užsakymų duomenis");
  }
});

Router.post("/new", ordersValidator, async (req, res) => {
  try {
    await db.Orders.create(req.body);
    res.send("Paslauga sėkmingai pridėta");
  } catch (error) {
    console.log(error);
    res.status(500).send("Įvyko klaida pridedant paslaugą");
  }
});

Router.get("/single/:id", async (req, res) => {
  try {
    const order = await db.Orders.findByPk(req.params.id);
    res.json(order);
  } catch (error) {
    console.log(error);
    res.status(500).send("Įvyko klaida");
  }
});

Router.put("/edit/:id", ordersValidator, async (req, res) => {
  try {
    const order = await db.Orders.findByPk(req.params.id);
    await order.update(req.body);
    res.send("Užsakymo duomenys sėkmingai atnaujinti");
  } catch (error) {
    console.log(error);
    res.status(500).send("Įvyko klaida");
  }
});

Router.delete("/delete/:id", async (req, res) => {
  try {
    const order = await db.Orders.findByPk(req.params.id);
    await order.destroy();
    res.send("Užsakymas sėkmingai ištrintas");
  } catch (error) {
    console.log(error);
    res.status(500).send("Įvyko klaida ištrinant užsakymą");
  }
});

export default Router;
