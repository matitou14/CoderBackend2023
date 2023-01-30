
const fs = require('fs');

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
    getProducts() {
        return this.products;
    }
    getProductById(id) {
        for (let i = 0; i < this.products.length; i++) {
            if (this.products[i].id === id) {
                return this.products[i];
            }
        }
        console.log('Not found');
    }
    addProduct = (title, description, price, thumbnail, code, stock) => {
        const id = this.generadorIds();
        if (!title || !description || !price || !thumbnail || !code || !stock) {
            console.error('Faltan datos para agregar el producto');
            return;
        }
        if (this.products.find(e => e.code === code)) {
            console.error('El producto ya existe y no puede ser agregado');
            return;
        }
        this.products.push({
            id,
            title,
            description,
            price,
            thumbnail,
            code,
            stock,
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


async function desafio() {

    const productManager = new ProductManager('products.json');
    await productManager.createProduct('vacio', 'corte para parrilla', 1200, 'http://www.ternerita.com/cortes/vacío.jpg', 101, 10);
    await productManager.createProduct('costilla', 'corte para parrilla', 999, 'http://www.ternerita.com/cortes/costilla.jpg', 102, 10);
    await productManager.createProduct('tomahawk', 'corte gourmet', 2000, 'http://www.ternerita.com/cortes/tomahawk.jpg', 103, 10);
    await productManager.createProduct('Tbone', 'corte gourmet', 1500, 'http://www.laternerita.com/cortes/tbone.jpg', 104, 15)
    await productManager.createProduct('Chorizo cerdo', 'embutidos', 500, 'http://www.laternerita.com/cortes/chorizo.jpg', 105, 10);
    // await productManager.updateProduct(5, 'Chorizo', 'embutidos', 500, 'http://www.laternerita.com/cortes/chorizo.jpg', 105, 10);
    // await productManager.deleteProduct(5);

}


desafio()







const productManager = new ProductManager();
productManager.addProduct('vacio', 'corte para parrilla', 1200, 'http://www.ternerita.com/cortes/vacío.jpg', 101, 10);
productManager.addProduct('costilla', 'corte para parrilla', 999, 'http://www.ternerita.com/cortes/costilla.jpg', 102, 10);
productManager.addProduct('tomahawk', 'corte gourmet', 2000, 'http://www.ternerita.com/cortes/tomahawk.jpg', 103, 10);
// productManager.addProduct('perro cromado', 'corte gourmet', 2000, 'http://www.ternerita.com/cortes/tomahawk.jpg', 103, 10);
// productManager.addProduct('tomahawk', 2000, 'http://www.ternerita.com/cortes/tomahawk.jpg', 104, 10);

// console.log(productManager.getProducts());
// console.log(productManager.getProductById(6));


