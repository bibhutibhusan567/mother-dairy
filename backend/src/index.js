const { Products } = require('./Products.js');
const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors');
const bcrypt = require('bcrypt');
const session = require('express-session');

const session_secret = "Bibhuti@123";

const app = express();
app.use(express.json());
app.use(cors({
  credentials: true,
  origin: 'http://localhost:3000'
}));

app.use(session(
  {
    secret: session_secret,
    cookie: { maxAge: 1 * 60 * 60 * 1000 }
  }
));//add special property called session to req

const db = mongoose.createConnection('mongodb://localhost:27017/Motherdairy', { useNewUrlParser: true, useUnifiedTopology: true });

const userSchema = new mongoose.Schema({
  userName: String,
  password: String,
  email: String
});
const productSchema = new mongoose.Schema({
  category: String,
  type: String,
  productName: String,
  searchName: String,
  quantity: String,
  price: Number

});
const purchaseHistorySchema = new mongoose.Schema({
  id: Number,
  userName: String,
  date: String,
  time: String,
  totalAmount: Number,
  purchaseItems: mongoose.Schema.Types.Array
});

const productModel = db.model('product', productSchema);
const userModel = db.model('user', userSchema);
const purchaseHistoryModel = db.model('purchaseHistory', purchaseHistorySchema);
const salt = 5;
//create db for product
const refreshAll = async () => {
  await productModel.deleteMany({});
  // console.log(connection)
  await productModel.insertMany(Products);
}
refreshAll();

const isNullOrUndefined = (val) => val === null || val === undefined;
//signup
app.post('/signup', async (req, res) => {
  const { userName, password, email } = req.body;

  const exisistingUser = await userModel.findOne({ userName });

  if (isNullOrUndefined(exisistingUser)) {
    const hashedPassword = bcrypt.hashSync(password, salt);
    const newUser = new userModel({ userName, password: hashedPassword, email });

    await newUser.save();
    req.session.userId = newUser._id;
    res.status(200).send({ success: `signup successful` });

  } else {
    res.status(400).send({ error: `Username ${userName} already taken please choose another` });
  }
});
//login
app.post('/login', async (req, res) => {

  const { userName, password } = req.body;
  const exisistingUser = await userModel.findOne({ userName });

  if (isNullOrUndefined(exisistingUser)) {
    res.status(401).send({ error: `Username or Password is incorrect` });

  } else {
    const hashedPassword = exisistingUser.password;
    if (bcrypt.compareSync(password, hashedPassword)) {
      req.session.userId = exisistingUser._id;
      res.status(200).send({ success: 'Logged in' });
    } else {
      res.status(401).send({ error: `Username or Password is incorrect` });
    }

  }
});
//change password
app.post('/updatepassword', async (req, res) => {
  const { email, password } = req.body;
  const getUser = await userModel.findOne({ email });
  if (isNullOrUndefined(getUser)) {
    res.status(401).send({ error: `Please enter a valid email id` });
  } else {
    const hashedPassword = bcrypt.hashSync(password, salt);
    await userModel.updateOne({ email }, { password: hashedPassword });
    res.status(201).send({ success: `password changed successful` });
  }
});
//logout
app.get('/logout', (req, res) => {
  if (!isNullOrUndefined(req.session)) {
    req.session.destroy(() => {
      res.sendStatus(200);
    });
  } else {
    res.sendStatus(200);
  }
});
app.get('/userinfo', async (req, res) => {
  const user = await userModel.findById(req.session.userId);
  res.send({ userName: user.userName });
});
//proper string helper function
const getProperStringValue = (val) => val < 10 ? `0${val}` : val;
//create purchaseHistory for user
app.post(`/purchasehistory`, async (req, res) => {
  const { purchaseItems, userName, totalAmount } = req.body;

  const newDate = new Date();
  const getHours = newDate.getHours() >= 12 ? newDate.getHours() - 12 : newDate.getHours();
  const hours = getProperStringValue(getHours);
  const AMorPM = newDate.getHours() >= 12 ? 'pm' : 'am';
  const minutes = getProperStringValue(newDate.getMinutes());
  const seconds = getProperStringValue(newDate.getSeconds());
  const day = getProperStringValue(newDate.getDate());
  const month = getProperStringValue(newDate.getMonth() + 1);

  const date = `${day}/${month}/${newDate.getFullYear()}`;
  const time = `${hours}${AMorPM}:${minutes}min:${seconds}sec`;

  const object = {
    id: newDate,
    userName,
    date: date,
    time: time,
    totalAmount,
    purchaseItems: purchaseItems
  }
  const newItem = new purchaseHistoryModel(object);
  await newItem.save();
  res.sendStatus(200);
});
//get purchaseHistory for user as soon as user Login
app.get(`/gethistory/:userName`, async (req, res) => {
  const userName = req.params.userName;
  const getUser = await purchaseHistoryModel.find({ userName });
  if (isNullOrUndefined(getUser)) {
    res.status(404).send({ error: 'You havent purchase any item yet' });
  }
  else {
    res.send(getUser);
  }
});
//nav_bar select search
app.get(`/showproducts/:product`, async (req, res) => {
  const product = req.params.product;
  console.log(product);
  try {
    const getProducts = await productModel.find({ type: product });
    res.send(getProducts);
  } catch (error) {
    res.send(error);
  }
});
//normal search
app.get(`/search/:searchItem`, async (req, res) => {
  const searchItem = req.params.searchItem;
  console.log(searchItem);
  const searchItems = await productModel.find(
    {
      $or: [
        { "category": searchItem },
        { "type": searchItem },
        { "searchName": searchItem }
      ]
    }
  );
  if (searchItems.length > 0) {
    res.send(searchItems);
  } else {
    res.status(404).send({ error: `${searchItem} is not available currently` });
  }
});
app.listen(8080, () => console.log(`DB is listening to port 8080`));
