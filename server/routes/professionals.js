const express = require("express");
const ProfessionalModel = require("../models/Professional");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { check, validationResult } = require("express-validator");

const router = express.Router();

//*REGISTER:

router.post(
  "/register",
  [
    check("name", "The name is required").notEmpty(),
    check("lastName", "The last name is required").notEmpty(),
    check("license", "matricula invalida").isNumeric(),
    check("password", "The password must have at least 6 characters").isLength({
      min: 6,
    }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json(errors);
    }

    try {
      const { name, lastName, password, license } = req.body;

      //si esta ya registrado
      const professionalRegistered = await ProfessionalModel.findOne({
        license,
      });
      if (professionalRegistered) {
        return res.status(400).json({ msg: "El profesional ya existe" });
      }

      //si no esta registrado
      const hashedPassword = await bcrypt.hash(password, 10);

      const newProfessional = new ProfessionalModel({
        name,
        lastName,
        password: hashedPassword,
        license,
      });
      await newProfessional.save();

      res.json({ msg: "Profesional registrado exitosamente", newProfessional });
    } catch (error) {
      console.log(error);
      res.json({ msg: "No se pudo registrar el profesional" });
    }
  }
);

//*LOGIN

router.post(
  "/login",
  [
    check("license", "matricula ingresada invalida").isNumeric(),
    check("password", "contraseña deber tener al menos 6 caracteres").isLength({
      min: 6,
    }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json(errors);
    }

    try {
      const { license, password } = req.body;
      const professionalLogin = await ProfessionalModel.findOne({ license });
      if (!professionalLogin) {
        return res.status(400).json({ msg: "El profesional no existe" });
      }

      const isPasswordValid = await bcrypt.compare(
        password,
        professionalLogin.password
      );
      if (!isPasswordValid) {
        return res.status(400).json({ msg: "El password no es correcto" });
      }

      //si se encuentra el email y si el password es valido, generar el jwt
      const token = jwt.sign({ id: professionalLogin._id }, process.env.SECRET);

      res.json({
        msg: "Inicio de sesion exitoso",
        token,
        professionalID: professionalLogin._id,
        professionalName: `${professionalLogin.name} ${professionalLogin.lastName}`,
      });
    } catch (error) {
      console.log(error);
      res.json({ msg: "No se pudo iniciar sesion" });
    }
  }
);

const verifyToken = (req, res, next) => {
  const token = req.headers.authorization;

  if (token) {
    jwt.verify(token, process.env.SECRET, (err) => {
      if (err) return res.sendStatus(403);
      next();
    });
  } else {
    res.sendStatus(401);
  }
};

module.exports = {
  router,
  verifyToken,
};
