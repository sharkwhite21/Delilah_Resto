const sequelize = require('sequelize');
const dataBase = new sequelize('mysql://root:@localhost:3306/delilah_resto'); // link de la databse
const jwt = require('jsonwebtoken');
const firma = 'delilahResto'


module.exports = {

    register: (req, res) => {
        dataBase.query(
            'INSERT INTO Clientes (user, pass, name, lastName, email, phone, direccion, is_admin) VALUES ( :user, :pass, :name, :lastName, :email, :telefono, :direccion, 0)',{
                replacements: req.body
            }).then(result => console.log(result) || res.status(200).json('Su usuario ha sido creado satisfactoriamente!'))
            .catch(error => console.log(error) || res.status(400).send('Dato Invalido'))
    },

    login: async(req, res) => {
        const reqUsuario = req.body.user;
        const reqPass = req.body.pass;
        const password = await dataBase.query(`SELECT id, pass FROM Clientes WHERE user = "${reqUsuario}"`, { type: sequelize.QueryTypes.SELECT });
        const isAdmin = await dataBase.query(`SELECT id, is_admin FROM Clientes WHERE user = "${reqUsuario}"`, { type: sequelize.QueryTypes.SELECT });
        console.log(isAdmin);
        const passOk = password[0].pass;
        const adminOk = isAdmin.find(item => item.is_admin === 1);

        if(passOk == reqPass){
            if (adminOk == undefined) {
                const user = password[0];
                const token = jwt.sign({user},firma)
                res.json({token})

            } else {
                const user = isAdmin[0];
                const token = jwt.sign({user, isAdmin}, firma);
                res.json({token});
            }
        }
        else{
            res.json('Usuario o pass incorrecta!');
        }
    },
    
    getCliente: (req, res) =>{
        dataBase.query('SELECT * FROM Clientes', { 
            type: sequelize.QueryTypes.SELECT 
        }).then(result =>res.status(200).json(result))
    },

    updateCliente: (req, res) => {
        const id = req.boy.id;
        const newPhone = req.body.phone;
        const newDireccion = req.body.direcion;
        const newEmail = req.body.newEmail;

        dataBase.query(
            `UPDATE Clientes SET phone = "${newPhone}", direccion = "${newDireccion}", email = "${newEmail}" WHERE id = ${id} `,{
                type: sequelize.QueryTypes.SET
            }).then(result => console.log(result) || res.status(200).json('Su usuario ha sido Actualizado satisfactoriamente!'))
            .catch(error => console.log(error) || res.status(400).send('Dato Invalido'))
    },

    deleteCliente: (req, res) =>{
        const id = req.params.id;
        dataBase.query(`DELETE FROM Clientes WHERE id = ${id}`,{type: sequelize.QueryTypes.DELETE})
            .then(result => (console.log(result)) || res.status(200).json("Cliente Eliminado"))
            .catch(error => console.log(error) || res.status(400).send('Invalid data'))  
    }
}