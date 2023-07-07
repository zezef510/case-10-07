import fs from "fs";
import qs from "qs";
import url from "url";
import product2Service from "../service/product2Service.js";
import popularityService from "../service/popularityService.js";

class Product2Controller {

    // showAll2(req, res) {
    //
    //     let data = '';
    //     req.on('data', dataRaw => {
    //         data += dataRaw;
    //     })
    //     req.on('end',  () => {
    //         if (req.method === 'GET') {
    //                 showList2(req, res);
    //         } else {
    //             data = qs.parse(data);
    //             const idDelete = data.idDelete;
    //             if(idDelete !== undefined){
    //                 product2Service.delete(idDelete).then(()=>{
    //                     res.writeHead(301,{'location': '/product2s'})
    //                     res.end()
    //                 })
    //             }
    //             else {
    //                 data = qs.parse(data);
    //                 product2Service.save2(data).then(() => {
    //                     showList2(req, res);
    //                 })
    //             }
    //         }
    //     })
    // }

    showAll2(req,res){
        fs.readFile('view/product/list2.html', 'utf-8', (err, stringHTML) => {
            let str = '<table style="width: 1200px ; height: 700px">';
            product2Service.findAll().then((products)=> {
                str += `<tr style="font-weight: bold ; font-size: 30px">
                    <td>ID</td>
                    <td>Name</td>
                    <td>Price</td>
                    <td>Quantity</td>
                    <td>Image</td>
                    <td>Popularity</td>
</tr>`
                for (const product of products) {
                    str+=`<tr>
                        <td>${product.id}</td>
                        <td>${product.name}</td>
                        <td>${product.price}</td>
                        <td>${product.quantity}</td>
                        <td>${product.image}</td>
                        <td>${product.typeEat}</td>
                        
                        <td><button class="act"> <a href="/edit-product?idEdit=${product.id}">Edit</a></button></td>
                        <td><form method='POST' action='/product2s'><input type='hidden' name='idDelete' value='${product.id}'><button class="act" type='submit'>Delete</button></form></td>
                        </tr>`
                }
                str += `</table>`
                stringHTML = stringHTML.replace('{list2}', str)
                res.write(stringHTML);
                res.end();
            })

        })
}

    showForm2Edit(req, res) {
        let urlObject = url.parse(req.url, true)
            let data = '';
            req.on('data', dataRaw => {
                data += dataRaw;
            })
            req.on('end',  () => {
                if (req.method === 'GET') {
                    fs.readFile('view/product/edit.html', 'utf-8', (err, stringHTML) => {
                        product2Service.findById(urlObject.query.idEdit).then((productZ) => {
                            stringHTML = stringHTML.replace("{id}", productZ.id)
                            stringHTML = stringHTML.replace("{name}", productZ.name)
                            stringHTML = stringHTML.replace("{price}", productZ.price)
                            stringHTML = stringHTML.replace("{quantity}", productZ.quantity)
                            stringHTML = stringHTML.replace("{image}", productZ.image);
                            // stringHTML = stringHTML.replace("{image}", productZ.popularityID);
                            res.write(stringHTML);
                            res.end();
                        })
                    })
                }else {
                    data = qs.parse(data);
                    product2Service.update(data).then(()=>{
                        res.writeHead(301,{'location': '/product2s'})
                        res.end()
                    })
                }
            })
    }

    showFormAdd2(req, res) {
        let data = '';
            req.on('data', dataRaw => {
                data += dataRaw;
            })
            req.on('end',  () => {
                if (req.method === "GET") {
                    fs.readFile('view/product/add2.html', 'utf-8', (err, stringHTML) => {
                        popularityService.findAll2().then(popularity => {
                            let str = " ";
                            for (const item of popularity) {
                                str += `<option value="${item.id}">${item.typeEat}</option>`
                            }
                            stringHTML = stringHTML.replace('{listPopularity}', str);
                            console.log(str)
                            res.write(stringHTML);
                            res.end();
                        })
                    })
                }else{
                    data = qs.parse(data)
                    product2Service.save2(data).then(()=>{
                        res.writeHead(301,{'location':'/product2s'})
                        res.end()
                    })
                }
            })

    }


}

// function showList2(req, res) {
//     fs.readFile('view/product/list2.html', 'utf-8', (err, stringHTML) => {
//         let str = '<table style="width: 1200px ; height: 700px">';
//         product2Service.findAll().then((products)=> {
//             str += `<tr style="font-weight: bold ; font-size: 30px">
//                     <td>ID</td>
//                     <td>Name</td>
//                     <td>Price</td>
//                     <td>Quantity</td>
//                     <td>Image</td>
//                     <td>Popularity</td>
//                 </tr>`
//             for (const product of products) {
//                 str+=`<tr>
//                         <td>${product.id}</td>
//                         <td>${product.name}</td>
//                         <td>${product.price}</td>
//                         <td>${product.quantity}</td>
//                         <td>${product.image}</td>
//                         <td>${product.typeEat}</td>
//
//                         <td><button class="act"> <a href="/edit-product?idEdit=${product.id}">Edit</a></button></td>
//                         <td><form method='POST' action='/product2s'><input type='hidden' name='idDelete' value='${product.id}'><button class="act" type='submit'>Delete</button></form></td>
//                         </tr>`
//             }
//             str += `</table>`
//             stringHTML = stringHTML.replace('{list2}', str)
//             res.write(stringHTML);
//             res.end();
//         })
//
//     })
// }

export default new Product2Controller();
