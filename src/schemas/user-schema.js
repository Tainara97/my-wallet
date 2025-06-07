import joi from "joi";

export const userLoginSchema = joi.object({
    email: joi.string().email().required(),
    password: joi.string().required()
});

export const userSchema = joi.object({
    name: joi.string().required(),
    email: joi.string().email().required(),
    password: joi.string().min(6).required()
});