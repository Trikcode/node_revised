const Product = require('../models/product')
const getAllProductsStatic = async (req, res) => {
  const search = 'a'
  const product = await Product.find({ price: { $gt: 30, $lt: 100 } })
    .sort('price')
    .select('name price')
  res.send({ product, nbhits: product.length })
}
const getAllProducts = async (req, res) => {
  const { featured, company, name } = req.query
  const queryObject = {}
  if (featured) {
    queryObject.featured = featured === 'true' ? true : false
  }
  if (company) {
    queryObject.company = company
  }
  // if(name){
  //   queryObject.name = {$regex:name, $search='i'}
  // }
  const product = await Product.find(queryObject)
  res.send({ product, nHits: product.length })
}

module.exports = {
  getAllProducts,
  getAllProductsStatic,
}
