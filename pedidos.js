const sequelize = require('sequelize');
const dataBase = new sequelize('mysql://root:@localhost:3306/delilah_resto'); //link de la dataBase 


module.exports ={

    postOrden: async (req, res) =>{
        const id_cliente = req.user.user.id;
        const idPago = req.body.id_pago;
        const order = await dataBase.query(`INSERT INTO Pedidos (id_pago, id_cliente) VALUES ( ${idPago},${id_cliente})`);
        const orderOK = await dataBase.query(`SELECT MAX(id) FROM Pedidos WHERE id_cliente = ${id_cliente}`, { type: sequelize.QueryTypes.SELECT });
        const orderId = Object.values(orderOK[0].valueOf('MAX(id)'));
        req.body.items.forEach(item => {
             dataBase.query(`INSERT INTO Producto_Pedido (cantidad, id_producto, id) VALUES (${item.cantidad},${item.id_producto},${orderId})`);
        })
        if(!orderOK){
            return res.status(400).json('Datos ingresados incorrectos');
        }else { 
         res.status(200).json('Pedido Realizado');
        }
    },

    getOrdenes: async (req,res) =>{
        const allOrders = await dataBase.query(`SELECT pedidos.id, pedidos.estado_id, pedidos.Fecha_Hora, productos.producto, producto_pedido.cantidad, productos.precio, Clientes.user, Clientes.phone, Clientes.direccion, Clientes.email, Clientes.name, Clientes.lastName
         FROM pedidos 
         JOIN producto_pedido ON pedidos.id = producto_pedido.id_pedido
         JOIN Clientes ON pedidos.id_cliente = Clientes.id 
         JOIN productos ON producto_pedido.id_producto = productos.id 
         JOIN Metodos_Pago ON pedidos.id_pago = Metodos_Pago.id`, { type: sequelize.QueryTypes.SELECT });
         if(allOrders == ""){
                return res.status(400).json('No hay nada que mostrar.');
            }else { 
             res.status(200).json(allOrders);
            }
    },   

    getOrden: async (req,res) => {
        const id = req.params.id;
        const idUser = req.user.user.id;
        const db = await dataBase.query(`SELECT * FROM Pedidos WHERE id = ${id} AND id_cliente = ${idUser}`, { type: sequelize.QueryTypes.SELECT });
        if(db == ""){
            return res.status(400).json('No hay Pedido que mostrar.');
        }else { 
         res.status(200).json(db);
        }
   
    },

    updateOrden: (req,res) => {
        const id = req.params.id;
        const status = req.body.estado_id;
        dataBase.query(`UPDATE Pedidos SET estado_id = '${status}' WHERE id = ${id} `,{type: sequelize.QueryTypes.SET}).then(result => (console.log(result)) || res.status(200).json("Estado Actualizado"));
    },

    deleteOrden: async (req,res) => {
        const id = req.params.id;
        const db = await dataBase.query(`SELECT * FROM Pedidos WHERE id = ${id}`, { type: sequelize.QueryTypes.SELECT });
        if(db[0].estado_id == 1){
            dataBase.query(`DELETE FROM Pedidos WHERE id = ${id}`,{type: sequelize.QueryTypes.DELETE})
            dataBase.query(`DELETE FROM Producto_Pedido WHERE id = ${id}`,{type: sequelize.QueryTypes.DELETE})
            .then(result => (console.log(result)) || res.status(200).json("Pedido Eliminado"))
            .catch(error => console.log(error) || res.status(400).send('Invalid data'))
        }else {
            return res.status(400).json('No se puede eliminar un pedido ya en proceso, cambiar el estado a Cancelado');
        }
    }
}   