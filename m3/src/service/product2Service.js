import connection from "../connection.js";


class Product2Service {
    constructor() {
        connection.connecting();
    }

    findAll() {
        let show =`select product.id,name,price,quantity,image,typeEat  from product`
            show += ` JOIN popularity ON product.popularityID = popularity.id`
        return new Promise((resolve, reject) => {
            connection.getConnection().query(show, (err, products) => {
                if (err) {
                    reject(err)
                } else {
                    resolve(products)
                }
            })
        })
    }

    save2(product) {
        let addZ = `INSERT INTO product (id,name,price,quantity,image,popularityID) 
            value ${product.id},${product.name},${product.price},${product.quantity},${product.image},${product.typeEat}`

        return new Promise((resolve, reject) => {
            connection.getConnection().query(addZ, (err, data) => {
                if (err) {
                    reject(err)
                } else {
                    resolve(data)
                    console.log(resolve)
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
                 image = '${product.image}',
                 popularity = ${product.popularityID}
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

export default new Product2Service();
