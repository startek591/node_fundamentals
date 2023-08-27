const Products = require('./products');

module.exports = {
  getProduct,
  listProducts,
  createProduct,
  editProduct,
  deleteProduct,
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
