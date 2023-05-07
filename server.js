const express = require("express");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const connectDB = require("./config/db");
const adminRoutes = require("./routes/adminRoutes");
const customerRoutes = require("./routes/customerRoutes");
const siteRoutes = require("./routes/siteRoutes");
const transportRoute = require("./routes/transportRoutes");
const tourGuideRoutes = require("./routes/TourGuideRoutes");
const hotelRoutes = require("./routes/hotelRoutes");
const roomRoutes = require("./routes/roomRoutes");
const reservationRoutes = require("./routes/reservationRoutes");
const { notFound, errorHandler } = require("./middleware/errorMiddleware");

dotenv.config();
connectDB();
app.use(express.json());
app.use("*", cors());

app.get("/", (req, res) => {
	res.send("API is Running");
});

app.use("/user/admin", adminRoutes);
app.use("/user/customer", customerRoutes);
app.use("/sites", siteRoutes);
app.use("/transport", transportRoute);
app.use("/guide", tourGuideRoutes);
app.use("/hotels", hotelRoutes);
app.use("/rooms", roomRoutes);
app.use("/reservations", reservationRoutes);

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5001;
app.listen(PORT, console.log(`Server Started on port ${PORT}..`));
