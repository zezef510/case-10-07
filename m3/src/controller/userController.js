import fs from "fs";
import product2Service from "../service/product2Service.js";
import userService from "../service/userService.js";

class UserController {
    showAllAcc(req, res) {
        fs.readFile('view/user/listAccount.html', 'utf-8', (err, stringHTML) => {
            let str = '<table style="width: 1200px ; height: 700px">';
            userService.findAllAccount().then((user)=> {
                str += `<tr style="font-weight: bold ; font-size: 30px">
                    <td>ID</td>
                    <td>UserName</td>
                    <td>Password</td>
                    <td>Email</td>
                    <td>fullName</td>
                    <td>addRess</td>
                    <td>Phone</td>
                    <td>Role</td>
                    <td>Image</td>
</tr>`
                for (const item of user) {
                    str+=`<tr>
                        <td>${item.id}</td>
                        <td>${item.userName}</td>
                        <td>${item.password1}</td>
                        <td>${item.email}</td>
                        <td>${item.fullName}</td>
                        <td>${item.address}</td>
                        <td>${item.Phone}</td>
                        <td>${item.Role}</td>
                        <td>${item.image}</td>
                        <td><button class="act"> <a href="/add-user">Dang nhap</a></button></td>
                        </tr>`
                }
                str += `</table>`
                stringHTML = stringHTML.replace('{listAcc}', str)
                res.write(stringHTML);
                res.end();
            })

        })
    }









    showFormAdd(req, res) {
        fs.readFile('view/user/add.html', 'utf-8', (err, stringHTML) => {
            res.write(stringHTML);
            res.end();
        })
    }
}

export default new UserController();
