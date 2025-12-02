import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import createHttpError from "http-errors";
import { loginSchema, registerSchema } from "../schemas/auth.schema.js";
import prisma from "../config/prisma.js";
import { getMe, getUserBy } from "../services/user.service.js";

export const register = async (req, res, next) => {
  const { email, firstName, lastName, password, confirmPassword, username } =
    req.body;
  console.log("req.body", req.body);

  // validation
  const user = registerSchema.parse(req.body);
  console.log("user from registerSchema", user);

  // find user for non-duplicate
  const haveUser = await getUserBy({ email: user.email });
  console.log("haveUser", haveUser);
  if (haveUser) {
    return next(createHttpError[409]("This user already register"));
  }

  const newUser = {
    ...user,
    password: await bcrypt.hash(password, 10),
  };

  const result = await prisma.user.create({ data: newUser });
  res.json({
    msg: "Register Successful",
    result: result,
  });
};

export const login = async (req, res, next) => {
  const { email, password } = req.body;
  const user = loginSchema.parse(req.body);
  const foundUser = await getUserBy({ email: user.email });

  console.log("foundUser loginSchema", foundUser);

  //check user
  if (!foundUser) {
    return next(createHttpError[401]("Invalid Login"));
  }

  //check password
  let pwOk = await bcrypt.compare(password, foundUser.password);
  if (!pwOk) {
    return next(createHttpError[401]("Invalid Login"));
  }

  const payload = { id: foundUser.id };
  const token = jwt.sign(payload, process.env.JWT_SECRET, {
    algorithm: "HS256",
    expiresIn: "15d",
  });
  const { password: pw, createdAt, updatedAt, ...userData } = foundUser;
  res.json({
    msg: "Login Successful",
    token: token,
    user: userData,
  });
};

export const profileUser = async (req, res, next) => {
  try {
    const userId = (req.user.id )
    const user = await getMe(userId)
    if(!user){
      return res.status(404).json({message: "User not found"})
    }
    const {password, createdAt, updatedAt, ...userData} = user
    res.json({
      success: true,
      user: {...userData}
    })
  } catch (error) {
    next(error)
  }

}


