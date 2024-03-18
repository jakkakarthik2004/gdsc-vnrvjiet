const exp = require("express");
const userApp = exp.Router();
const expressAsyncHandler = require("express-async-handler");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const getDBObj = require("./DBConnection");
const nodemailer = require("nodemailer");

require("dotenv").config();

userApp.use(exp.json());

const getNextSequenceValue = async (sequenceName) => {
  const sequenceCollection = await getDBObj("sequenceCollection");
  const sequenceDocument = await sequenceCollection.findOneAndUpdate(
    { _id: sequenceName },
    { $inc: { sequence_value: 1 } },
    { returnOriginal: false, upsert: true }
  );
  return sequenceDocument.sequence_value;
};

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: API endpoints related to users
 */

/**
 * @swagger
 * /users/getusers:
 *   get:
 *     summary: Retrieve all users
 *     tags: [Users]
 *     responses:
 *       '200':
 *         description: A JSON array of users
 *       '500':
 *         description: Internal Server Error
 */
userApp.get(
  "/getusers",
  expressAsyncHandler(async (request, response) => {
    let userCollectionObject = await getDBObj("userCollectionObject");
    let users = await userCollectionObject.find().toArray();
    response.send({ message: "Users list", payload: users });
  })
);

/**
 * @swagger
 * /users/get-user/{userId}:
 *   get:
 *     summary: Retrieve a user by ID
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID of the user to retrieve
 *     responses:
 *       '200':
 *         description: A JSON object representing the user
 *       '404':
 *         description: User not found
 *       '500':
 *         description: Internal Server Error
 */
userApp.get(
  "/get-user/:userId",
  expressAsyncHandler(async (request, response) => {
    const userId = request.params.userId;

    try {
      const userCollectionObject = await getDBObj("userCollectionObject");
      const user = await userCollectionObject.findOne({
        userId: parseInt(userId),
      });
      if (!user) {
        response.status(404).send({ message: "User not found" });
        return;
      }

      response.send({ message: "User found", user: user });
    } catch (error) {
      console.error("Error fetching user:", error);
      response.status(500).send({ message: "Error fetching user" });
    }
  })
);

/**
 * @swagger
 * /users/login:
 *   post:
 *     summary: Log in user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       '200':
 *         description: Success
 *       '400':
 *         description: Invalid user or password
 *       '500':
 *         description: Internal Server Error
 */
userApp.post(
  "/login",
  expressAsyncHandler(async (request, response) => {
    let userCollectionObject = await getDBObj("userCollectionObject");
    let userCredObj = request.body;
    let userOfDB = await userCollectionObject.findOne({
      email: userCredObj.email,
    });
    if (userOfDB == null) {
      response.send({ message: "Invalid user" });
    } else {
      let status = await bcryptjs.compare(
        userCredObj.password,
        userOfDB.password
      );
      if (status == false) {
        response.send({ message: "Invalid password" });
      } else {
        let token = jwt.sign({ email: userOfDB.email }, process.env.PVT_KEY, {
          expiresIn: 6000000,
        });
        response.send({
          message: "success",
          payload: token,
          userObj: userOfDB,
        });
      }
    }
  })
);

/**
 * @swagger
 * /users/create:
 *   post:
 *     summary: Create a new user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *               role:
 *                 type: string
 *     responses:
 *       '200':
 *         description: User created successfully
 *       '500':
 *         description: Internal Server Error
 */
userApp.post(
  "/create",
  expressAsyncHandler(async (request, response) => {
    const userCollectionObject = await getDBObj("userCollectionObject");

    let newUserObj = request.body;

    const userOfDB = await userCollectionObject.findOne({
      email: newUserObj.email,
    });
    const userId = await getNextSequenceValue("teamIdSequence");
    newUserObj = { ...newUserObj, userId };
    if (userOfDB !== null) {
      response.send({
        message: "Email has already Exist. Please try to login",
      });
    } else {
      const hashedPassword = await bcryptjs.hash(newUserObj.password, 6);
      newUserObj.password = hashedPassword;
      await userCollectionObject.insertOne(newUserObj);
      response.send({ message: "New User created" });
    }
  })
);

/**
 * @swagger
 * /users/create-many:
 *   post:
 *     summary: Create multiple users
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: array
 *             items:
 *               type: object
 *               properties:
 *                 name:
 *                   type: string
 *                 email:
 *                   type: string
 *                 password:
 *                   type: string
 *                 role:
 *                   type: string
 *     responses:
 *       '200':
 *         description: Users created successfully
 *       '500':
 *         description: Internal Server Error
 */
userApp.post(
  "/create-many",
  expressAsyncHandler(async (request, response) => {
    try {
      const userCollectionObject = await getDBObj("userCollectionObject");
      const users = request.body;

      for (const user of users) {
        const userOfDB = await userCollectionObject.findOne({
          email: user.email,
        });

        if (userOfDB !== null) {
          console.log(
            `User with email ${user.email} already exists. Skipping...`
          );
          continue;
        }

        const userId = await getNextSequenceValue("teamIdSequence");

        const hashedPassword = await bcryptjs.hash(user.password, 6);
        user.password = hashedPassword;

        user.userId = userId;

        await userCollectionObject.insertOne(user);
      }

      response.send({ message: "Users created successfully" });
    } catch (error) {
      console.error("Error while creating users", error);
      response.status(500).send({ error: "An error occurred" });
    }
  })
);

/**
 * @swagger
 * /users/forgot-password:
 *   post:
 *     summary: Forgot password
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *     responses:
 *       '200':
 *         description: Email sent successfully
 *       '500':
 *         description: Internal Server Error
 */
userApp.post(
  "/forgot-password",
  expressAsyncHandler(async (request, response) => {
    try {
      const { email } = request.body.data.email;

      const otp = generateOTP();
      OTP[email] = otp;

      const transporter = nodemailer.createTransport({
        service: "gmail",
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        auth: {
          user: "your-email",
          pass: "app-password",
        },
      });

      const mailOptions = {
        from: "your-email",
        to: email,
        subject: "Password reset OTP",
        text: `Your OTP (It is expired after 1 min): ${otp}`,
      };

      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          response.send({ message: error });
        } else {
          response.json({
            data: "Your OTP has been sent to your email",
          });
        }
      });
    } catch (error) {
      response.send({ message: error });
    }
  })
);

/**
 * @swagger
 * /users/verify-otp:
 *   post:
 *     summary: Verify OTP
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               otp:
 *                 type: string
 *     responses:
 *       '200':
 *         description: OTP verified successfully
 *       '400':
 *         description: Invalid OTP
 *       '500':
 *         description: Internal Server Error
 */
userApp.post("/verify-otp", (request, response) => {
  const enteredOTP = request.body.data.otp.otp;
  const expectedOTP = OTP[request.body.data.email.email];
  if (enteredOTP == expectedOTP) {
    response.send({ message: "OTP verified successfully", result: true });
  } else {
    response.status(400).send({ message: "Invalid OTP", result: true });
  }
});

/**
 * @swagger
 * /users/reset-password:
 *   post:
 *     summary: Reset password
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *               confirmPassword:
 *                 type: string
 *     responses:
 *       '200':
 *         description: Password reset successful
 *       '500':
 *         description: Internal Server Error
 */
userApp.post("/reset-password", async (request, response) => {
  try {
    const { password, confirmPassword, email } = request.body;
    const hashedPassword = await bcryptjs.hash(password, 6);
    let userCollectionObject = await getDBObj("userCollectionObject");
    if (password != confirmPassword) {
      response.send("Passwords dont match");
    }
    const result = await userCollectionObject.updateOne(
      { email: email },
      { $set: { password: hashedPassword } }
    );
    response.json({
      data: "Password reset successful",
    });
  } catch (error) {
    response.send(error);
  }
});

module.exports = userApp;
