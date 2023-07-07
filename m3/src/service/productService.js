import connection from "../connection.js";


class ProductService {
    constructor() {
        connection.connecting();
    }

    findAll() {
        return new Promise((resolve, reject) => {
            connection.getConnection().query('select * from product', (err, products) => {
                if (err) {
                    reject(err)
                } else {
                    resolve(products)
                }
            })
        })
    }

    save(product) {
        return new Promise((resolve, reject) => {
            connection.getConnection().query(`INSERT INTO product VALUES (${product.id},${product.name},${product.price},${product.quantity},${product.image});`, (err, data) => {
                if (err) {
                    reject(err)
                } else {
                    resolve(data)
                }
            })
        })

    }
    delete(idDelete) {
        return new Promise((resolve, reject) => {
            connection.getConnection().query(`DELETE FROM product WHERE id = ${idDelete}`, (err, delProduct) => {
                        if (err) {
                            reject(err);
                        } else {
                            resolve(delProduct);
                        }
                    });


        });
    }
    update(product) {
        return new Promise((resolve, reject) => {
            connection.getConnection().query(
                `update product set 
                 name = '${product.name}',
                 price = ${product.price},
                 quantity = ${product.quantity},
                 image = '${product.image}'
                 where id = ${product.id}`, (err, data) => {
                if (err) {
                    reject(err)
                } else {
                    resolve(data)
                }
            })
        })
    }


    findById(id) {
        return new Promise((resolve, reject) => {
            connection.getConnection().query(`select * from product where id = ${id}`, (err, products) => {
                if (err) {
                    reject(err)
                } else {
                    resolve(products[0])
                }
            })
        })
    }
}

export default new ProductService();
