const express = require("express");
const dotenv = require("dotenv");
const cors = require('cors');
const mongoose = require("mongoose");
const bodyParser = require('body-parser');
const productRoutes = require('./routes/productRoutes');
const cartRoutes = require('./routes/cartRoutes');
const userRoutes = require("./routes/userRoutes");
 
dotenv.config();
const app = express();
 
// Middleware
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use('/uploads', express.static('uploads'));
 
 
// Routes
app.use("/user", userRoutes);
app.use('/products', productRoutes);
app.use('/cart', cartRoutes);
 
// Connect to MongoDB and Start Server
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log("MongoDB Connected");
        app.listen(process.env.PORT || 8000, () => {
            console.log(`Server running on port ${process.env.PORT || 5000}`);
        });
    })
    .catch((err) => console.log(err));