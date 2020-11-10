# Delilah_Resto
Creacion de API para aplicacion Delilah Resto. Proyecto Backend.

Se utilizan las siguientes tecnologias: 
  - express
  - nodejs
  - MySQL 
  - Javascript 

# SERVIDOR: 
  Para iniciar el servidor:
    -Instalar la dependencia "express" (npm install express);
    -Dentro del archivo "api.js" se puede ver que el puerto que se esta utilizando es 3001, si desea puede cambiarlo.
    
# DEPENDENCIAS:
  En esta API se utilizan las siguientes dependencias que deberá instalar:
    - body-parser
    - cors
    - sequelize
    - jsonwebtoken
    - MySQL2

(Encontrarán todas las dependencias en "package.json")

# BASE DE DATOS:
  Una vez instalada la dependencia, en el archivo "Base-de-datos.sql" se puede encontrar todo lo necesario para inicializar la base de datos. 
  Se recomienda usar PhpMyAdmin.

# RESPONSE:
  Toda las respuestas serán un objeto json.

# ENDPOINTS:
  A clientes: 
    - post/clientes/register
    - post/clientes/login
    - get/clientes
    - put/clientes
    - delete/clientes/:id

  A productos:
    - post/productos/create
    - get/productos
    - put/productos/:id
    - delete/productos/:id

  A Pedidos
    - post/pedidos
    - get/pedidos
    - get/pedidos/:id
    - put/pedidos/:id
    - delete/pedidos/:id
