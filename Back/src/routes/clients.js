const express = require('express');
const fs = require('fs');
const path = require('path');
const router = express.Router();
const bodyParser = require('body-parser'); //bodyParser nos permite recibir parametros por POST
const multiPart = require('connect-multiparty');


const mysqlConnection = require('../database.js');
const { urlencoded } = require('body-parser');

const multiPartMiddleWare = multiPart({
    uploadDir: './src/uploads'
})

router.get('/clients', (req,res)=>{
    mysqlConnection.query('CALL listClients();',(err,rows,fields)=>{
        if(!err){
            res.json(rows);
        }else{
            console.log(err);
        }
    })
})

router.get('/clients/:dni', (req,res)=>{
    const {dni} = req.params;
    const valores = [ dni ];
    mysqlConnection.query(`CALL clientDni(?)`,valores,(err,rows,fields)=>{
        if(!err){
            res.json(rows);
            //res.json({ok:true})
        }else{
            console.log(err);
        }
    })
})

var urlencodedParser = bodyParser.urlencoded({limit: '10mb',extended: false });

router.post('/clients/',urlencodedParser,(req,res)=>{
 
    const { c_dni, c_name, c_lastname} = req.body;
    const valores = [ c_dni, c_name, c_lastname ];
    mysqlConnection.query(`CALL insertClient(?,?,?)`,valores,(err,rows,fields)=>{
        if(!err){
            res.json({ok:true});
        }else{
            console.log(err);
        }
    })
})

router.put('/clients/uploadFront/:dni',urlencodedParser,(req,res)=>{
    const dni = req.params.dni;
    const { c_dni_front } = req.body;
    let base64String = c_dni_front;
    let base64Image = base64String.split(';base64,').pop();
    let buf = Buffer.from(base64Image, 'base64');

   
    fs.writeFile(path.join(__dirname, '/../uploads/', dni+'_cara.jpeg'), buf,{encoding: 'base64'}, function(error) {
        if (error) {
            throw error;
        } else {
            var imgPath = __dirname+ '\\..\\uploads\\'+ dni+'_cara.jpeg';
            const valores = [dni, imgPath]
            mysqlConnection.query(`CALL addDniFront(?,?)`,valores,(err,rows,fields)=>{
                if(!err){
                    res.json({ok:true});
                }else{
                    console.log(err);
                }
            })
            return true;
        }
    });
    
})
router.put('/clients/uploadBack/:dni',urlencodedParser,(req,res)=>{
    const dni = req.params.dni;
    const { c_dni_back } = req.body;
    let base64String = c_dni_back;
    let base64Image = base64String.split(';base64,').pop();
    let buf = Buffer.from(base64Image, 'base64');

   
    fs.writeFile(path.join(__dirname, '/../uploads/', dni+'_reverso.jpeg'), buf,{encoding: 'base64'}, function(error) {
        if (error) {
            throw error;
        } else {
            var imgPath = __dirname+ '\\..\\uploads\\'+ dni+'_reverso.jpeg';
            const valores = [dni, imgPath]
            mysqlConnection.query(`CALL addDniBack(?,?)`,valores,(err,rows,fields)=>{
                if(!err){
                    res.json({ok:true});
                }else{
                    console.log(err);
                }
            })
            return true;
        }
    });
    
})

router.delete('/clients/:dni',(req,res)=>{
    const { dni } = req.params;
    mysqlConnection.query(`CALL deleteClient(${dni})`,(err,rows,fields)=>{
        if(!err){
            res.json({ok:true})
        }else{
            console.log(err);
        }
    })
})

//Utilizo este metodo para hacer una 'Eliminacion logica', 
//en la bd tengo un campo llamado c_status que por defecto tendra un valor TRUE (string)
//al hacer la eliminacion logica actualizo ese campo y lo coloco en FALSE (string)
//entonces al listar solo traeria los clientes que tengan ese campo como TRUE
router.put('/clients/ldelete/:dni', urlencodedParser,(req,res)=>{
    const c_dni = req.params.dni;
    //const { c_dni } = req.body;
    const valores = [ c_dni ]
    mysqlConnection.query(`CALL logicDeleteClient(?)`,valores,(err,rows,fields)=>{
        if(!err){
            res.json({ok: true});
        }else{
            console.log(err);
        }
    })

})

router.put('/clients/:dni', urlencodedParser,(req,res)=>{
    const c_dni = req.params.dni;
    const {c_name,c_lastname,c_dni_front,c_dni_back} = req.body;
    const valores = [c_dni,c_name,c_lastname,c_dni_front,c_dni_back]
    mysqlConnection.query(`CALL updateClient(?,?,?,?,?)`,valores,(err,rows,fields)=>{
        if(!err){
            res.json({ok:true})
        }else{
            console.log(err);
        }
    })
})

module.exports = router;