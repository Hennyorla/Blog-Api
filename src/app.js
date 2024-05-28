const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const app = express();
const sanitizer = require("perfect-express-sanitizer");
const userRoutes = require('./routes/userRoutes');
const blogRoutes = require('./routes/blogRoutes');
const authRoutes = require('./routes/authRoutes');



//global middleware configuration for json data
app.use(express.json());

//global middleware configuration for cookie parser
app.use(cookieParser());

//global middleware configuration for cors
app.use(cors());

//global middleware configuration for sanitizer
app.use(
  sanitizer.clean({
    xss: true,
    noSql: true,
  })
);
//router configuration as a global middleware
app.use('/users', userRoutes);
app.use('/blogs', blogRoutes);
app.use('/auth', authRoutes);

//root route
app.get('/', (req, res) => {
    res.send('SERVER IS ALIVE');
});




module.exports = app;