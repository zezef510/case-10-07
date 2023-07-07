import fs from "fs";
import productService from "../service/productService.js";
import qs from "qs";
import url from "url";

class ProductController {

    showAll(req, res) {

        let data = '';
        req.on('data', dataRaw => {
            data += dataRaw;
        })
        req.on('end',  () => {
            if (req.method === 'GET') {
                    showList(req, res);
            } else {
                data = qs.parse(data);
                const idDelete = data.idDelete;
                console.log(idDelete)
                if(idDelete !== undefined){
                    productService.delete(idDelete).then(()=>{
                        res.writeHead(301,{'location': '/products'})
                        res.end()
                    })
                }
                else {
                    data = qs.parse(data);
                    productService.save(data).then(() => {
                        showList(req, res);
                    })
                }
            }
        })
    }

    showFormEdit(req, res) {
        let urlObject = url.parse(req.url, true)
            let data = '';
            req.on('data', dataRaw => {
                data += dataRaw;
            })
            req.on('end',  () => {
                if (req.method === 'GET') {
                    fs.readFile('view/product/edit.html', 'utf-8', (err, stringHTML) => {
                        productService.findById(urlObject.query.idEdit).then((product) => {
                            stringHTML = stringHTML.replace("{id}", product.id)
                            stringHTML = stringHTML.replace("{name}", product.name)
                            stringHTML = stringHTML.replace("{price}", product.price)
                            stringHTML = stringHTML.replace("{quantity}", product.quantity)
                            stringHTML = stringHTML.replace("{image}", product.image);
                            res.write(stringHTML);
                            res.end();
                        })
                    })
                }else {
                    data = qs.parse(data);
                    productService.update(data).then(()=>{
                        res.writeHead(301,{'location': '/products'})
                        res.end()
                    })
                }
            })
    }

    showFormAdd(req, res) {
        fs.readFile('view/product/add.html', 'utf-8', (err, stringHTML) => {
            res.write(stringHTML);
            res.end();
        })
    }


}

function showList(req, res) {
    fs.readFile('view/product/FormDangnhap.html', 'utf-8', (err, stringHTML) => {
        let str = '<table style="width: 1200px ; height: 700px">';
        productService.findAll().then((products)=> {
            str += `<tr style="font-weight: bold ; font-size: 30px">
                    <td>ID</td>
                    <td>Name</td>
                    <td>Price</td>
                    <td>Quantity</td>
                    <td>Image</td>
</tr>`
            for (const product of products) {
                str+=`<tr>
                        <td>${product.id}</td>
                        <td>${product.name}</td>
                        <td>${product.price}</td>
                        <td>${product.quantity}</td>
                        <td>${product.image}</td>
                        <td><button class="act"> <a href="/edit-product?idEdit=${product.id}">Edit</a></button></td>
                        <td><form method='POST' action='/products'><input type='hidden' name='idDelete' value='${product.id}'><button class="act" type='submit'>Delete</button></form></td>
                        </tr>`
            }
            str += `</table>`
            stringHTML = stringHTML.replace('{list}', str)
            res.write(stringHTML);
            res.end();
        })
    })
}

export default new ProductController();
