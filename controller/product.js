const fs = require('fs');
const mongoose = require('mongoose');
const model = require('../model/product');
const Product = model.Product;
// const index = fs.readFileSync('index.html', 'utf-8');
// const data = JSON.parse(fs.readFileSync('data.json', 'utf-8'));
// const products = data.products;

// create
exports.createProduct = (req, res) => {
  // create new copy
const product = new Product(req.body);
// product.title = 'PhoneX';
// product.price = 9999;
// product.rating = 5;
// product.save((err,doc)=>{
//   console.log({err,doc})
//   res.status(201).json(doc);
// })
// Using promises
product.save()
  .then(savedDocument => {
    // Handle the saved document
    console.log("savedDocument",savedDocument)
    res.status(201).json(savedDocument)
  })
  .catch(error => {
    console.log('error',error);
    res.status(400).json(error)
    // Handle the error
  });

// // Using async/await
// try {
//   const savedDocument = await myModel.save();
//   // Handle the saved document
// } catch (error) {
//   // Handle the error
// }


};

// read data
exports.getAllProducts = async(req, res) => {
  // const products=await Product.find({price:{$gt:550}})
  const products=await Product.find({})
  res.json(products);
};

exports.getProduct = async(req, res) => {
  // const id = +req.params.id;
  const id = req.params.id;
  console.log('id',id);
  // const product = products.find((p) => p.id === id);
  const product = await Product.findById(id)
  res.json(product);
};
// put request re jaha update kariba se gudaks hin asibo


exports.replaceProduct = async(req, res) => {
  const id = req.params.id;
  // const productIndex = products.findIndex((p) => p.id === id);
  // products.splice(productIndex, 1, { ...req.body, id: id });

  // ethi try catch karagala bcuz restrict achi product modal r title ta means unique achi
  try{
    // if new:true, return the modified document rather than the original
    const doc = await Product.findOneAndReplace({_id:id},req.body,{new:true})
    res.status(201).json(doc)
  }catch(err){
    console.log('error',err)
    res.status(400).json(err)
  }
  
};
// patch request
//  but patch update re new updated data sah puruna data bi asibo
// kebala part of data ku update kariba not update all the data
exports.updateProduct = async(req, res) => {
  const id = req.params.id;
  // const productIndex = products.findIndex((p) => p.id === id);
  // const product = products[productIndex];
  // products.splice(productIndex, 1, { ...product, ...req.body });
  try{
    // if new:true, return the modified document rather than the original
    const doc = await Product.findOneAndUpdate({_id:id},req.body,{new:true})
    res.status(201).json(doc)
  }catch(err){
    console.log('error',err)
    res.status(400).json(err)
  }
 
};
exports.deleteProduct = async(req, res) => {
  const id = req.params.id;
  // const productIndex = products.findIndex((p) => p.id === id);
  // const product = products[productIndex];
  // products.splice(productIndex, 1);
  try{
    // if new:true, return the modified document rather than the original
    const doc = await Product.findOneAndDelete({_id:id})
    res.status(201).json(doc)
  }catch(err){
    console.log('error',err)
    res.status(400).json(err)
  }
  // res.status(201).json(product);
};
