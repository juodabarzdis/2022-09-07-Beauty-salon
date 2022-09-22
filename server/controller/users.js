import express from "express";
import db from "../database/connect.js";
import bcrypt from "bcrypt";
import { registerValidator, loginValidator } from "../middleware/validate.js";
import { auth } from "../middleware/auth.js";

const router = express.Router();
const saltRounds = 10;

router.post("/register", registerValidator, async (req, res) => {
  try {
    const userExists = await db.Users.findOne({
      where: { email: req.body.email },
    });
    if (userExists) {
      res.status(400).send("Toks vartotojas jau egzistuoja");
      return;
    }
    const { first_name, last_name, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    new db.Users({
      first_name,
      last_name,
      email,
      password: hashedPassword,
    }).save();
    res.send("Vartotojas sukurtas");
  } catch {
    res.status(400).send("Registracija nepavyko");
  }
});

router.post("/login", loginValidator, async (req, res) => {
  try {
    const user = await db.Users.findOne({
      where: {
        email: req.body.email,
      },
    });
    if (user.length === 0) {
      console.log("Vartotojas nerastas");
      return res.status(400).send("Vartotojas nerastas");
    }
    const validPassword = await bcrypt.compare(
      req.body.password,
      user.dataValues.password
    );
    if (validPassword) {
      req.session.user = {
        id: user.id,
        email: user.email,
        username: user.username,
        role: user.role,
      };
      console.log(req.session.user);
      return res.json({
        message: "Vartotojas prisijungė",
        user: req.session.user,
      });
    }
  } catch {
    res.status(500).send("Įvyko klaida");
  }
});

router.get("/logout", (req, res) => {
  req.session.destroy();
  res.send("Vartotojas atsijungė");
});

router.get("/check-auth", auth, async (req, res) => {
  console.log(req.session.user);
  return res.json(req.session.user);
});

export default router;
