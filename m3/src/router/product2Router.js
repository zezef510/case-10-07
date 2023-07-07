import fs from 'fs'
import qs from "qs";
import Product2Service from "../service/product2Service.js";
import product2Service from "../service/product2Service.js";
import product2Controller from "../controller/product2Controller.js";
let product2Router = {
    '/product2s': product2Controller.showAll2,
    '/add2-product': product2Controller.showFormAdd2,
    '/edit2-product': product2Controller.showForm2Edit,
}

export default product2Router;
