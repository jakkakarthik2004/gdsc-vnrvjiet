const exp = require("express");
const userApp = exp.Router();
const expressAsyncHandler = require("express-async-handler");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const getDBObj = require("./DBConnection");
const nodemailer = require("nodemailer");

require("dotenv").config();

userApp.use(exp.json());

userApp.get(
  "/getusers",
  expressAsyncHandler(async (request, response) => {
    let userCollectionObject = await getDBObj("userCollectionObject");
    let users = await userCollectionObject.find().toArray();
    response.send({ message: "Users list", payload: users });
  })
);

userApp.get(
  "/get-user/:userId",
  expressAsyncHandler(async (request, response) => {
    const userId = request.params.userId;

    try {
      const userCollectionObject = await getDBObj("userCollectionObject");
      let users = await userCollectionObject.find().toArray();
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

userApp.post(
  "/create",
  expressAsyncHandler(async (request, response) => {
    let userCollectionObject = request.app.get("userCollectionObject");
    let newUserObj = request.body;
    let userOfDB = await userCollectionObject.findOne({
      email: newUserObj.email,
    });
    if (userOfDB !== null) {
      response.send({
        message: "Email has already Exist. Please try to login",
      });
    } else {
      let hashedPassword = await bcryptjs.hash(newUserObj.password, 6);
      newUserObj.password = hashedPassword;
      await userCollectionObject.insertOne(newUserObj);
      response.send({ message: "New User created" });
    }
  })
);

const generateOTP = () => {
  return Math.floor(1000 + Math.random() * 9000);
};

// const sendOTPByEmail = (email, otp, callback) => {
//   const transporter = nodemailer.createTransport({
//     service: "Gmail",
//     auth: {
//       user: "youremail@gmail.com",
//       pass: "yourpassword",
//     },
//   });

//   const mailOptions = {
//     from: "youremail@gmail.com",
//     to: email,
//     subject: "Password reset OTP",
//     text: `Your OTP (It is expired after 1 min): ${otp}`,
//   };

//   transporter.sendMail(mailOptions, callback);
// };

const OTP = {};

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

userApp.post("/verify-otp", (request, response) => {
  const enteredOTP = request.body.data.otp.otp;
  const expectedOTP = OTP[request.body.data.email.email];
  if (enteredOTP == expectedOTP) {
    response.send({ message: "OTP verified successfully", result: true });
  } else {
    response.status(400).send({ message: "Invalid OTP", result: true });
  }
});

userApp.post("/reset-password", async (request, response) => {
  try {
    const { password, confirmPassword, email } = request.body;
    const hashedPassword = await bcryptjs.hash(password, 6);
    let userCollectionObject = await getDBObj("userCollectionObject");

    const result = await userCollectionObject.updateOne(
      { email: "jgondipalle@gmail.com" },
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
