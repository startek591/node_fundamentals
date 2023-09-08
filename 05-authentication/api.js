const Orders = require('./models/orders');
const Products = require('./models/products');
const Users = require('./models/users');

module.exports = {
  getProduct,
  listProducts,
  createProduct,
  editProduct,
  deleteProduct,
  createOrder,
  listOrders,
};

async function getProduct(req, res, next) {
  const { id } = req.params;

  try {
    const product = await Products.get(id);
    if (!product) return next();

    res.json(product);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

async function listProducts(req, res) {
  const { offset = 0, limit = 25, tag } = req.query;

  try {
    res.json(
      await Products.list({
        offset: Number(offset),
        limit: Number(limit),
        tag,
      })
    );
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

async function createProduct(req, res, next) {
  try {
    const product = await Products.create(req.body);
    return res.json(product);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

async function editProduct(req, res, next) {
  try {
    const change = req.body;
    const product = await Products.edit(req.params.id, change);

    res.json(product);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

async function deleteProduct(req, res, next) {
  try {
    await Products.remove(req.params.id);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

async function createOrder(req, res, next) {
  const order = await Orders.create(req.body);
  res.json(order);
}

async function listOrders(req, res, next) {
  const { offset = 0, limit = 25, productId, status } = req.query;

  const orders = await Orders.list({
    offset: Number(offset),
    limit: Number(limit),
    productId,
    status,
  });

  res.json(orders);
}

async function createUser(req, res, next) {
  const user = await Users.create(req.body);
  const { username, email } = user;
  res.json({ username, email });
}
