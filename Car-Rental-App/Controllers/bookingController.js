const { v4: uuidv4 } = require("uuid");
const stripe = require("stripe")(
  "sk_test_51K8lJeSGkXsHpk6s5rnSzxHsShc9bYWdupt7krPVubHYS06G8zhZj2dyA208tSj86k3RKKsHc3meQsdohlq5V7Po004oYO8LpQ"
);
const nodemailer = require("nodemailer"); 
const Booking = require("../Models/bookingModel");
const Car = require("../Models/carModel");

// Function to send email
const sendEmail = async (email, subject, text) => {
  // Create a Nodemailer transporter
  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "justride1203@gmail.com", 
      pass: "pbej xrfk qmmn gvgt", 
    },
  });

  // Email message options
  let mailOptions = {
    from: "justride1203@gmail.com", 
    to: email, 
    subject: subject,
    text: text,
  };

  // Send email
  await transporter.sendMail(mailOptions);
};

exports.bookCar = async (req, res) => {
  const { token } = req.body;
  try {
    const customer = await stripe.customers.create({
      email: token.email,
      source: token.id,
    });

    const payment = await stripe.charges.create(
      {
        amount: req.body.totalAmount * 100,
        currency: "inr",
        customer: customer.id,
        receipt_email: token.email,
        description: "Car rental services",
      },
      {
        idempotencyKey: uuidv4(),
      }
    );

    if (payment) {
      req.body.transactionId = payment.source.id;
      const newBooking = new Booking(req.body);
      await newBooking.save();

      const car = await Car.findOne({ _id: req.body.car });
      car.bookedTimeSlots.push(req.body.bookedTimeSlots);
      console.log(req.body)
      await car.save();

      // Send email to the customer
      const emailSubject = "Car Booking Confirmation";
      const emailText = "Dear Customer,\n\nYour car has been successfully booked.\n\nBooking Details:\nBooking ID: " + newBooking._id + "\nVehicle: " + car.name  +  "\n\nThank you for choosing our car rental service.\n\nBest Regards,\nThe JustRide Team";
      await sendEmail(token.email, emailSubject, emailText);

      res.send("Your booking is successful. Email sent to customer.");
    } else {
      return res.status(400).json({ error: "Payment failed." });
    }
  } catch (error) {
    console.log(error);
    return res.status(400).json({ error: error.message });
  }
};

exports.getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.find().populate("car").populate("user");
    res.send(bookings);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};
