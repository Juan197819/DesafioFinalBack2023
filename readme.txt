Todas las routers de la carpeta "routes" se pueden probar desde POSTMAN o desde la URL desde el navegador. 
Desde vistas tambien se puede probar el logueo y el registro comun y por Github.
 Al registrarte el rol sera usuario. 
 Para cambiarlo podra acceder mediante el boton "ver y actualizar usuario" donde tendra los datos del usurio y un boton para pasar de rol Premium a rol Usuario y viceversa
 El mail de administrador esta seteado como variable de entorno (en el archivo .env por defecto se dejo "adminCoder@coder.com" como unico "admin")
 Al loguearse como administrador las vistas no tendran botones de compra pero si de creacion de productos via sockets.
 Al loguearse como premium podra comprar solo sus productos y cambiar de rol a usuario.

Importante: No hay vistas para todas las funciones de la aplicacion, solo para logueo, registro cambio de rol, creacion de producto via socket y compra completa de un carrito (que incluye creacion de carrito, agregado de productos 
compra del carrito).

Para el resto de las rutas que "/api/....   usar POSTMAN.

DATO: Al registrar hacerlo con mail real para probar las funciones de envio de mails. 

EL ADMINISTRADOR:
    Puede cambiar rol de otros usuarios pero no el propio.
    Puede editar cualquier dato de cualquier y del propio.
    Puede eliminar todos los usuarios que no se loguearon en los ultimos 2 dias salvo asi mismo
    
    
