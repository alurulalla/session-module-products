const express = require('express');
const dotenv = require('dotenv');
const axios = require('axios');
const cors = require('cors');

const app = express();
dotenv.config();

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT;

const getProducts = async (req, res) => {
  const { data } = await axios.get('http://localhost:4050/api/v1/products');

  res.json(data);
};

const selectedProduct = async (req, res) => {
  // put selected product in session
  const { selectedProduct } = req.body;
  const { step } = req.query;

  if (selectedProduct) {
    const obj = {
      sessionKey: `step${step}`,
      data: selectedProduct,
    };
    const { data } = await axios.post(
      'http://localhost:5000/api/v1/session',
      obj
    );
    return res.json({ messge: 'successfully added data in session' });
  } else {
    res.status(404).json({ messge: 'Selected Product Not Found' });
  }
};

app.get('/api/v1/products', getProducts);
app.post('/api/v1/products', selectedProduct);

app.listen(PORT, () => console.log(`metronet app is running on port ${PORT}`));
