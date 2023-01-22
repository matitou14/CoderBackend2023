class ProductManager {
    constructor(){
        this.products = [];
    }
 
    generadorIds = () => {
        const count = this.products.length;
        if (count === 0){
            return 1
        } else {
            return this.products[count - 1].id + 1
        }
    }
    getProducts(){
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
    addProduct = (title, description, price, thumbnail, code, stock  ) => {
        const id = this.generadorIds();
        if (!title || !description || !price || !thumbnail || !code || !stock){
            console.error('Faltan datos para agregar el producto');
            return;
        }
        if (this.products.find(e => e.code === code )) {
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
}
const productManager = new ProductManager ();
productManager.addProduct('vacio', 'corte para parrilla', 1200, 'http://www.ternerita.com/cortes/vacío.jpg', 101, 10);
productManager.addProduct('costilla', 'corte para parrilla', 999, 'http://www.ternerita.com/cortes/costilla.jpg', 102, 10);
productManager.addProduct('tomahawk', 'corte gourmet', 2000, 'http://www.ternerita.com/cortes/tomahawk.jpg', 103, 10);

// console.log(productManager.getProducts());
console.log(productManager.getProductById(2));