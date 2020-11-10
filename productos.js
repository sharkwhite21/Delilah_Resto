const sequelize = require('sequelize');
const dataBase = new sequelize('mysql://root:@localhost:3306/delilah_resto'); //link de la database 

module.exports = {

    createProducto: (req, res) =>{
        dataBase.query(
            'INSERT INTO productos (producto, description, precio, disponibilidad, image) VALUES (:producto, :description, :precio, :disponibilidad, :image)',{
                replacements: req.body
            }).then(result => console.log(result) || res.status(200).json('Producto Agregado'))
              .catch(error => console.log(error) || res.status(400).send('Dato Invalido'))
    },

    getProductos: (req, res) => {
        dataBase.query('SELECT * FROM productos', { 
            type: sequelize.QueryTypes.SELECT 
        }).then(result =>res.status(200).json(result))
        .catch(error => console.log(error) || res.status(400).json('Dato Invalido'))
    },

    updateProducto: (req, res) =>{
        const id = req.params.id;
        const nuevoPrecio = req.body.precio;
        const status = req.body.disponibilidad;
            if(req.body.precio){
                if(req.body.disponibilidad == 0||1){
                    dataBase.query(`UPDATE productos SET precio = ${nuevoPrecio}, disponibilidad = ${status} WHERE id = ${id}`,{type: sequelize.QueryTypes.SET})
                    .then(result => console.log(result) || res.status(200).json("Producto Actualizado"))
                    .catch(error => console.log(error) || res.status(400).send('Dato Invalido'))
                } else {
                dataBase.query(`UPDATE productos SET precio = ${nuevoPrecio} WHERE id = ${id}`,{type: sequelize.QueryTypes.SET})
                .then(result => console.log(result) || res.status(200).json("Producto Actualizado"))
                .catch(error => console.log(error) || res.status(400).send('Dato Invalido'))
                }
            } else {
                if(req.body.disponibilidad == 0||1 ){
                dataBase.query(`UPDATE productos SET disponibilidad = ${status} WHERE id = ${id}`,{type: sequelize.QueryTypes.SET})
                .then(result => (console.log(result)) || res.status(200).json("Producto Actualizado"))
                .catch(error => console.log(error) || res.status(400).send('Dato Invalido'))                
                }
            }
    },

    deleteProducto: (req, res) => {
        const id = req.params.id   
            dataBase.query(`DELETE FROM productos WHERE id = ${id}`,{type: sequelize.QueryTypes.DELETE})
            .then(result => (console.log(result)) || res.status(200).json("Producto Eliminado"))
            .catch(error => console.log(error) || res.status(400).send('Dato Invalido'))               
    }
}