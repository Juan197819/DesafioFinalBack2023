Todas los routers de la carpeta "routes" se pueden probar desde POSTMAN o desde la URL desde el navegador. 
Desde vistas tambien se puede probar el logueo y el registro comun y por Github.
Al registrarte el rol sera usuario. 
Para cambiarlo podra acceder mediante el boton "ver y actualizar usuario" donde tendra los datos del usurio y un boton para pasar de rol Premium a rol Usuario y viceversa
El mail de administrador esta seteado como variable de entorno (en el archivo .env por defecto se dejo "adminCoder@coder.com" como unico "admin")
Al loguearse como administrador las vistas no tendran botones de compra pero si de creacion de productos via sockets.
Al loguearse como premium podra comprar solo sus productos y cambiar de rol a usuario.

Importante: No hay vistas para todas las funciones de la aplicacion, solo para logueo y registro, cambio de rol, creacion de producto via socket y compra completa de un carrito (que incluye creacion de carrito, agregado de productos 
compra del carrito).

Para el resto de las rutas que "/api/....   usar POSTMAN.

DATO: Al registrar hacerlo con mail real para probar las funciones de envio de mails. 

EL ADMINISTRADOR:
    Puede cambiar rol de otros usuarios pero no el propio.
    Puede editar cualquier dato de cualquier usuario y del propio.
    Puede eliminar todos los usuarios que no se loguearon en los ultimos 2 dias salvo asi mismo.
    Puede crear, editar y eliminar cualquier producto.
    
EL PREMIUM:
    Puede crear, editar y eliminar productos propios.
    Crear carrito, agregar productos no propios, editarlo y comprarlo.
    Cambiar el rol propio a usuario.
    Editar datos de usuario propio no ajenos.

El USUARIO
    Crear carrito, agregar cualquier producto, editarlo y comprarlo.
    Cambiar de rol a premium

TODOS LOS GET ESTAN HABILITADOS PARA CUALQUIER ROL

EN LA URL http://localhost:8080/docs/ TAMBIEN SE PUEDEN PROBAR CASI TODOS LOS ENDPOINTS DE CARTS Y PRODUCTS MEDIANTE SWAGGER (debera loguearse primero entrando en http://localhost:8080 con el rol que quiera y luego una vez logueado podra probar cada end). ALGUNAS RUTAS AGREGADAS POSTERIORMENTE NO SE ENCONTRARAN EN SWAGGER, ESTAS PODRAN PROBARSE TRANQUILAMENTE EN POSTMAN.


PARA INICIAR APP:
        
    npm start ó node app.js  => Inicia por defecto 

    Argumentos habilitados para pasar por CMD:

        -p || --port para setear Puerto, ej: 
                node app.js -p 7070
                node app.js --port 7070
                    8080 x defecto seteado desde archivo configCommander.js

        -m || --mode para setear entorno ('development' ó 'production') , ej: 
                node app.js -m production
                node app.js --mode development
                    development x defecto seteado desde archivo .env

        -s || --storage para setear persistencia ('MongoDB' ó 'FileSystem') , ej: 
                node app.js -s MongoDB
                node app.js --storage FileSystem
                    MONGODB x defecto seteado desde archivo .env
ADVERTENCIA:
                    LA APP ESTA CONSTRUIDA PARA AGREGAR OTRAS PERSISTENCIAS CREANDO LA LOGICA EN ARCHIVOS DAO
                    SIN EMBARGO NO SE CREARON TODAS LAS NUEVAS RUTAS EN FILESYSTEM NI SE ACTUALIZRON ANTERIORES POR LO QUE SETEARLA EN ESA PERSISTENCIA DARA ERROR EN LA MAYORIA DE LOS CASOS
                    
                    PARA PROBAR QUE LA ESTRUCTURA CON VARIAS PERSISTENCIAS ES CORRECTA ALGUNAS DE LAS RUTAS QUE SI FUNCIONAN CON FILESYSTEM Y PUEDEN PROBARSE SON:
                    LA BUSQUEDA POR ID O LA CRECION DE PRODUCTOS=> 
                       GET  http://127.0.0.1:8080/api/products/1
                       POST  http://127.0.0.1:8080/api/products/

                    

PUEDE GENERAR PRODUCTOS RAPIDAMENTE CON ENDPOINT http://127.0.0.1:8080/mockingproducts?qty=10   DONDE qty es la cantidad de productos que quiero crear (por defecto seran 5),
 estos se guardaran automaticamenteen la BD.


