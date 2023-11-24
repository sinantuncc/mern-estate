import jwt from 'jsonwebtoken';
import User from '../models/user.model.js';
import bcrypt from 'bcryptjs';
import { errorHandler } from '../utils/error.js';

export const signup = async (req, res, next) => {
  const { username, email, password } = req.body;
  try {
    const hashedPassword = bcrypt.hashSync(password, 10);

    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });

    await newUser.save();

    res.status(201).json('User created successfully!');
  } catch (error) {
    next(error);
  }
};

export const signin = async (req, res, next) => {
  const { usernameOrEmail, password } = req.body;

  try {
    const validUser = await User.findOne({
      $or: [{ username: usernameOrEmail }, { email: usernameOrEmail }],
    });

    if (!validUser) return next(errorHandler(404, 'User not found!'));

    const validPassword = bcrypt.compareSync(password, validUser.password);

    if (!validPassword) return next(errorHandler(401, 'wrong credentials'));

    const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET_KEY);

    const { password: pass, ...rest } = validUser._doc;

    res
      .cookie('access_token', token, { httpOnly: true })
      .status(200)
      .json(rest);
  } catch (error) {
    next(error);
  }
};

export const google = async (req, res, next) => {
  try {
    const { name, email, photo } = req.body;

    const user = await User.findOne({ email });

    if (user) {
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET_KEY);
      const { password: pass, ...rest } = user._doc;

      res
        .cookie('access_token', token, { httpOnly: true })
        .status(200)
        .json(rest);
    } else {
      const generatedPassword =
        Math.random().toString(36).slice(-8) +
        Math.random().toString(36).slice(-8);

      const hashedPassword = bcrypt.hashSync(generatedPassword, 10);

      const username =
        name.split(' ').join('').toLowerCase() +
        Math.random().toString(36).slice(-4);

      const newUser = await User({
        username,
        email,
        password: hashedPassword,
        avatar: photo,
      });

      await newUser.save();

      const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET_KEY);
      const { password: pass, ...rest } = newUser._doc;

      res
        .cookie('access_token', token, { httpOnly: true })
        .status(200)
        .json(rest);
    }
  } catch (error) {
    next(error);
  }
};
