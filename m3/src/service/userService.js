import connection from "../connection.js";


class UserService {
    constructor() {
        connection.connecting();
    }

    findAllAccount() {
        return new Promise((resolve, reject) => {
            connection.getConnection().query('select * from users', (err, products) => {
                if (err) {
                    reject(err)
                } else {
                    resolve(products)
                    console.log(products)
                }
            })
        })
    }

    addAccount(product) {
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

export default new UserService();
