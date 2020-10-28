CREATE DATABASE delilah_resto;
CREATE TABLE Clientes( id int PRIMARY KEY AUTO_INCREMENT, user varchar(255) , pass varchar(255), name varchar(255), lastName varchar(255), email varchar(255), phone int, direccion varchar(255), is_admin tinyint(1) DEFAULT 0);

INSERT INTO Clientes( user, pass, name , lastName , email, phone, direccion, is_admin)
VALUES('Marbal','qwerty123','Marlon','Baldovino','mbaldovino44@gmail','3257845','cll 54 #87-25',1),
('Anyeliz52','pandita','Anyeliz','Garcia','AnyeGarcia@gmail','2478632','cll 85 #78-41',0),
('Sebas41','Themaster32','Sebastian','castaneda','sebascasta@gmail','4751853','cr56 #85-10',0),
('Chapulin23','kikiki','Roberto','Gomez','RoberGo@gmail','7326142','transv 4 #74-23',0),
('Harry20','wiguardun','Harry','Potter','HarryPopoter@gmail.com','4571396','cra 85 #74-74',0),
('Hermanoie','mestiza','Hermaione','Ranger','HermRanger@gmail','743214','av 14 #51-74',0);

CREATE TABLE Productos(id int PRIMARY KEY AUTO_INCREMENT, producto varchar(255) , description varchar(255), precio decimal(10,2), disponibilidad tinyint(1) DEFAULT 1, image varchar(255));

INSERT INTO Productos(producto, description , precio, disponibilidad, image)
VALUES ('Hamburguesa Chesse','Hamburguesa queso','15.00', 1, 'hamburguesaChe.jpg'),
('Hamburguesa Doble Carne','Hamburguesa doble carnse','30.00', 1, 'hamburguesaDoble.jpg'),
('Perro Americano','Perro queso americano y salchicha de ternera','20.00', 1, 'PerroAme.jpg'),
('Chuzo desgranado','Chuzo desgranado','18.00', 1, 'Chuzodes.jpg');


CREATE TABLE Metodos_Pago (id int PRIMARY KEY AUTO_INCREMENT, estado varchar(255));
INSERT INTO Metodos_Pago (estado) VALUE ('Contado'),('Tarjeta de Credito');

CREATE TABLE estado_id (id int PRIMARY KEY AUTO_INCREMENT, estado varchar(255));
INSERT INTO estado_id(estado) VALUE ('Nuevo'),('Confirmado'),('Enviado'),('Entregado'),('Cancelado');

CREATE TABLE Pedidos (id int PRIMARY KEY AUTO_INCREMENT, estado_id int DEFAULT 1, Fecha_Hora datetime TIMESTAMP DEFAULT CURRENT_TIMESTAMP, id_pago int, id_cliente int);

INSERT INTO Pedidos (estado_id, Fecha_Hora, id_pago, id_cliente) VALUES
( 1, '2020-10-27 01:40:01', 1, 1),
( 1, '2020-10-27 01:40:33', 1, 3),
( 1, '2020-10-27 01:40:48', 2, 2),
( 2, '2020-10-27 01:40:50', 2, 2),
( 1, '2020-10-27 19:24:01', 2, 2),
( 1, '2020-10-27 19:24:51', 3, 2),
( 1, '2020-10-27 19:25:22', 1, 2);


CREATE TABLE Producto_Pedido (id int PRIMARY KEY AUTO_INCREMENT, cantidad int,  id_producto int, id_pedido int);
