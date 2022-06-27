const express = require('express');
const dotenv = require('dotenv');
const axios = require('axios');
const cors = require('cors');
const cookieParser = require('cookie-parser');

const app = express();
dotenv.config();

app.use(cors());
app.use(express.json());
app.use(cookieParser());

const userPayments = [];

const PORT = process.env.PORT;

const getProducts = async (req, res) => {
  const { data } = await axios.get('http://localhost:4050/api/v1/products');

  res.json(data);
};

const payment = (req, res) => {
  const { data } = req.body;

  userPayments.push({ ...data });

  res.json({ message: 'successfully added payment information' });
};

const getUserDetails = (req, res) => {
  const { email } = req.params;

  const user = userPayments.find((x) => x.email === email);

  if (user) {
    return res.json(user);
  } else {
    return res.send(404);
  }
};

app.get('/api/v1/products', getProducts);
app.post('/api/v1/payment', payment);
app.get('/api/v1/user/:email', getUserDetails);

app.listen(PORT, () => console.log(`metronet app is running on port ${PORT}`));
