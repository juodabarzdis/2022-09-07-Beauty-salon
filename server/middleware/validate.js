import Joi from "joi";
import { INTEGER } from "sequelize";
const validate = (schema, req, res, next) => {
  const options = {
    abortEarly: true, // jei true, radus klaida, netikrina kitu laukeliu
    stripUnknown: true,
  };
  const { error, value } = schema.validate(req.body, options);

  let message = "";

  console.log(message);
  if (error) {
    switch (error.details[0].path[0]) {
      case "first_name":
        message = "Neteisingai nurodytas vartotojo vardas";
        break;
      case "last_name":
        message = "Neteisingai nurodytas vartotojo pavardė";
        break;
      case "email":
        message = "El pastas per trumpas arba neteisingas formatas";
        break;
      case "password":
        message = "per trumpas slaptazodis";
        break;
      default:
        message = "Neteisingai užpildyti laukeliai";
        break;
    }
    return res.status(500).send(message);
  }
  console.log(value);
  req.body = value;
  next();
};

export const registerValidator = (req, res, next) => {
  const schema = Joi.object({
    first_name: Joi.string().min(2).max(50).required(),
    last_name: Joi.string().min(2).max(50).required(),
    email: Joi.string().email().min(2).max(50).required(),
    password: Joi.string().min(4).max(12).required(),
  });

  validate(schema, req, res, next);
};

export const loginValidator = (req, res, next) => {
  const schema = Joi.object({
    email: Joi.string().email().min(2).max(50).required(),
    password: Joi.string().min(4).max(12).required(),
  });

  validate(schema, req, res, next);
};

export const workersValidator = (req, res, next) => {
  const schema = Joi.object({
    first_name: Joi.string().min(2).max(100).required(),
    last_name: Joi.string().min(2).max(100).required(),
    photo: Joi.string().allow(""),
    saloonId: Joi.number().integer().required(),
  });
  validate(schema, req, res, next);
};

//name duration price
export const servicesValidator = (req, res, next) => {
  const schema = Joi.object({
    name: Joi.string().min(2).max(100).required(),
    duration: Joi.string().min(2).max(100).required(),
    price: Joi.number().required(),
    saloonId: Joi.number().integer().required(),
  });
  validate(schema, req, res, next);
};

export const saloonsValidator = (req, res, next) => {
  const schema = Joi.object({
    address: Joi.string().min(2).max(100).required(),
    name: Joi.string().min(2).max(100).required(),
    phone: Joi.string().min(2).max(100).required(),
  });
  validate(schema, req, res, next);
};

export const ratingsValidator = (req, res, next) => {
  const schema = Joi.object({
    rating: Joi.number().required(),
  });
  validate(schema, req, res, next);
};

export const ordersValidator = (req, res, next) => {
  const schema = Joi.object({
    order_date: Joi.date().required(),
    status: Joi.number().integer(),
    serviceId: Joi.number().integer().required(),
    workerId: Joi.number().integer().required(),
  });
  validate(schema, req, res, next);
};

export default validate;
