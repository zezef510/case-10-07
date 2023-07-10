import connection from "../connection.js";

class PopularityService{
    constructor() {
        connection.connecting()
    }
    findAll2(){
        return new  Promise((resolve, reject) => {
            connection.getConnection().query(`
                            select * from popularity`, (err,list)=>{
                if (err){
                    reject(err)
                }else {
                    resolve(list)
                }
            })
        })
    }

}
export default new PopularityService();