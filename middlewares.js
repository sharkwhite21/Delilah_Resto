const sequelize = require('sequelize');
const dataBase = new sequelize ('mysql://root:@localhost:3306/delilah_resto');
const jwt = require('jsonwebtoken');
const firma = 'delilahResto';

module.exports = {

    checkIdProducto: async (req, res, next) => {
            const db = await dataBase.query(`SELECT * FROM productos WHERE id = ${req.params.id}`, {type: sequelize.QueryTypes.SELECT})
            const dbFind = db.find(item => item.id == req.params.id)
            if(!dbFind){
                return res.status(400).json('Id incorrecto');
            } 
            next() 
    },

    validacionUser: async (req, res, next) => {
        const db = await dataBase.query(`SELECT * FROM clientes WHERE user = "${req.body.user}"`, {type: sequelize.QueryTypes.SELECT})
        const dbFind = db.find(item => item.user == req.body.user)
        if(!dbFind){
            return res.status(400).json('user o contraseña incorrectos!');
        } 
        next() 
    },

    onlyAdmin: (req, res, next) => {
        try{
            const token = req.headers.authorization.split(' ')[1]
            const verifyToken = jwt.verify(token, firma);
            if(verifyToken){
                req.user = verifyToken;
                if(req.user.user.is_admin === 1){
                    return next()
                } else{ 
                    res.json({error: 'Solo administradores'})
                }

            }
        } catch (err){
            res.json({error: 'error al validar user'})
        }

    },

    userOK: (req, res, next) => {
        try{
            const token = req.headers.authorization.split(' ')[1]
            const verifyToken = jwt.verify(token, firma)
            if(verifyToken){
                req.user = verifyToken;
                return next()
            }
        } catch (err){
            res.json({error: 'error al validar user'})
        }
    },

    validarIdPedido: async (req, res, next) => {
        const db = await dataBase.query(`SELECT * FROM pedidos WHERE id = ${req.params.id}`, {type: sequelize.QueryTypes.SELECT})
        const dbFind = db.find(item => item.id == req.params.id)
        if(!dbFind){
            return res.status(400).json('Id incorrecto');
        } 
        next() 
},
}