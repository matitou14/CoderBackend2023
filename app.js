const fs = require('fs');
const express = require("express");
const ProductManager = require("./ProductManager");

const app = express();
const productsPath = "./products.json";
const productManager = new ProductManager(productsPath);

app.get("/products", async (req, res) => {
    try {
      let products = await productManager.getProducts();
      const limit = req.query.limit;
      if (limit) {
        products = products.slice(0, limit);
      }
      res.json({ products });
    } catch (error) {
      res.status(500).send({ error: error.message });
    }
  });

  app.get("/products/:pid", async (req, res) => {
    try {
      const pid = req.params.pid;
      const product = await productManager.getProductById(pid);
      if (!product) {
        res.status(404).json({ message: "Product not found" });
      } else {
        res.json({ product });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });




app.listen(8080, () => {
    console.log('Server is running on port 8080');
})
