const server = require('express')();
const bodyParserJson = require('body-parser').json();
const { register, login, getCliente, updateCliente, deleteCliente } = require('./clientes');
const { createProducto, deleteProducto, updateProducto, getProductos } = require('./productos')

server.listen(3001, ()=> console.log('servidor iniciado... '));
server.use(bodyParserJson);
server.use(function (err,req,res,next) {
    if (!err) return next();
    console.log('Ha ocurrido un error, Favor revisar.',err);
    res.status(500).send('Error');
});

// Clientes
server.post('/clientes', register);
server.post('/clientes/login', validacionUser, login);
server.get('/clientes', onlyAdmin, getCliente);
server.put('/clientes', userOk, updateCliente);
server.delete('/clientes/:id', onlyAdmin, deleteCliente);

// Productos
server.post('/productos', onlyAdmin, createProducto);
server.get('/productos', getProductos);
server.put('/productos/:id', checkIdProducto, onlyAdmin, updateProducto);
server.delete('/productos/:id', onlyAdmin, checkIdProducto, deleteProducto);

// Orden
server.post('/pedidos', userOK, postOrder)
server.get('/pedidos', onlyAdmin, getAllOrders)
server.get('/pedidos/:id', userOK, getOrder)
server.put('/pedidos/:id', onlyAdmin, updateOrder)
server.delete('/pedidos/:id', validarIdPedido, onlyAdmin, deleteOrder) 
