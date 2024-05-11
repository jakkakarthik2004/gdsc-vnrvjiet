const exp = require("express");
const mailApp = exp.Router();
const expressAsyncHandler = require("express-async-handler");
require("dotenv").config();

mailApp.use(exp.json());

const Razorpay = require("razorpay")
const crypto = require("crypto")
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const QRCode = require('qrcode');

mailApp.use(exp.urlencoded({ extended:false }));
mailApp.use(bodyParser.json({ limit: '10mb', extended: true }))
mailApp.use(bodyParser.urlencoded({ limit: '10mb', extended: true }))

const sendEmail = async (email, orderId, paymentId) => {
    const qrCode = await QRCode.toDataURL(email);
    qrCodeImage=new Buffer.from(qrCode.split("base64,")[1], "base64")
    try {
        const transporter = nodemailer.createTransport({
            service: "gmail",
            host: "smtp.gmail.com",
            port: 587,
            secure: false,
            auth: {
              user: "b15productpricetracker@gmail.com",
              pass: "nucvokqwzbgmkogp",
            },
        });
        const mailOptions = {
            from: {
                name: "B15 Product Pricetracker",
                address: "b15productpricetracker@gmail.com"
            },
            to: `${email}`,
            subject: "Order Confirmation",
            attachDataUrls:true,
            html: `
                <h1>Order Confirmation</h1>
                <img src="${qrCode}" alt="QR Code" />
                <p>Order ID: ${orderId}</p>
                <p>Payment ID: ${paymentId}</p>
                <p>Thank you for your order!</p>
                <p>Best regards</p>
            `
        }
        await transporter.sendMail(mailOptions);
        console.log('Email sent successfully');
    }
    catch (err) {
        console.error('Error sending email:', error);
    }
  }
  
  mailApp.post("/order", async(req, res) => {
    try {
        const razorpay = new Razorpay({
            key_id: process.env.RAZORPAY_KEY_ID,
            key_secret: process.env.RAZORPAY_SECRET
        })
        if(!req.body) {
            return res.status(400).send("Bad Request");
        }
        const options = req.body;
        // const email = req.body.email;
        console.log(options);
        const order = await razorpay.orders.create(options);
        if(!order) {
            return res.status(400).send("Bad Request");
        }
        res.json(order);
    }
    catch (err){
        console.log(err);
        res.status(500).send(err)
    }
  })
  
  mailApp.post("/validate", async (req, res) => {
  
    const {razorpay_order_id, razorpay_payment_id, razorpay_signature, email} = req.body
  
    const sha = crypto.createHmac("sha256", process.env.RAZORPAY_SECRET);
  
    sha.update(`${razorpay_order_id}|${razorpay_payment_id}`);
  
    const digest = sha.digest("hex");
  
    if (digest!== razorpay_signature) {
        return res.status(400).json({msg: " Transaction is not legit!"});
    }
    await sendEmail(email, razorpay_order_id, razorpay_payment_id);
    res.json({msg: " Transaction is legit!", orderId: razorpay_order_id,paymentId: razorpay_payment_id});
  })

module.exports = mailApp;