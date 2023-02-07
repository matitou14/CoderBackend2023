
const { rejects } = require('assert');
const fs = require('fs');
const { resolve } = require('path');

class ProductManager {
    constructor(path) {
        this.products = [];
        this.path = path;
    }

    generadorIds = () => {
        const count = this.products.length;
        if (count === 0) {
            return 1
        } else {
            return this.products[count - 1].id + 1
        }
    }
    async getProducts() {
        return new Promise((resolve, reject) => {
          fs.readFile(this.path, 'utf8', (err, data) => {
            if (err) {
              reject(err);
            } else {
              resolve(JSON.parse(data));
            }
        });
    });
};
async getProductById(id) {
    return new Promise((resolve, reject) => {
      fs.readFile(this.path, 'utf8', (err, data) => {
        if (err) {
          reject(err);
        } else {
          const products = JSON.parse(data);
          const product = products.find(p => p.id === id);
          if (!product) {
            reject(new Error(`Product with id ${id} not found`));
          } else {
            resolve(product);
          }
        }
      });
    });
  }

  createProduct = async (title, description, price, thumbnail, code, stock,) => {
    let id
    if (this.products.length === 0) id = 1
    else id = this.products[this.products.length - 1].id + 1
    this.products.push({ id, title, description, price, thumbnail, code, stock }),
        fs.writeFileSync(this.path, JSON.stringify(this.products, null, 2))
}

updateProduct = async (id, title, description, price, thumbnail, code, stock) => {
    const productIndex = this.products.findIndex(product => product.id === id);
    if (productIndex === -1) {
        console.error('Product not found');
        return;
    }
    this.products[productIndex] = { id, title, description, price, thumbnail, code, stock };
    fs.writeFileSync(this.path, JSON.stringify(this.products, null, 2));
}

deleteProduct = async (id) => {
    const products = JSON.parse(fs.readFileSync(this.path, 'utf-8'));
    const updatedProducts = products.filter((product) => product.id !== id);
    fs.writeFileSync(this.path, JSON.stringify(updatedProducts, null, 2));
  };

}



const catalogo = fs.readFileSync('products.json', 'utf-8');
console.log(JSON.parse(catalogo));












module.exports = ProductManager;