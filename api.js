const server = require('express')();
const bodyParserJson = require('body-parser').json();
const { checkIdProducto, validacionUser, onlyAdmin, userOK, validarIdPedido } = require('./middlewares');
const { register, login, getCliente, updateCliente, deleteCliente } = require('./clientes');
const { createProducto, deleteProducto, updateProducto, getProductos } = require('./productos');
const { postOrden, getOrdenes,getOrden, updateOrden, deleteOrden } = require('./pedidos');

server.listen(3001, ()=> console.log('servidor iniciado... '));
server.use(bodyParserJson);
server.use(function (err,req,res,next) {
    if (!err) return next();
    console.log('Ha ocurrido un error, Favor revisar.',err);
    res.status(500).send('Error');
});

// Clientes
server.post('/clientes/register', register);
server.post('/clientes/login', validacionUser, login);
server.get('/clientes', onlyAdmin, getCliente);
server.put('/clientes', userOK, updateCliente);
server.delete('/clientes/:id', onlyAdmin, deleteCliente);

// Productos
server.post('/productos/create', onlyAdmin, createProducto); 
server.get('/productos', getProductos);
server.put('/productos/:id', checkIdProducto, onlyAdmin, updateProducto);
server.delete('/productos/:id',  checkIdProducto, onlyAdmin, deleteProducto);

// Pedidos
server.post('/pedidos', userOK, postOrden);
server.get('/pedidos', onlyAdmin, getOrdenes);
server.get('/pedidos/:id', userOK, getOrden);
server.put('/pedidos/:id', onlyAdmin, updateOrden);
server.delete('/pedidos/:id', validarIdPedido, onlyAdmin, deleteOrden);
