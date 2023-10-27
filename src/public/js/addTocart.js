/* ---------------- FUNCION AUTOINVOCADA QUE TOMA EL EMAIL DEL USUARIO LOGUEADO DESDE EL ATRIBUTO "data-email" del H1 PARA ARMAR UN BOTON CON LA RUTA DE PRODUCTOS DEL CARRITO ESPECIFICO PARA ESE USUARIO---------------- */
let nav, h1, email, rol
(async function () {
    h1 = document.querySelector('header div h1');
    if (h1) {
        rol = document.querySelector('header div h1 span').textContent
        nav = document.getElementById('nav');
        email = h1.getAttribute('data-email') //EN EL H1 DEL HTML CREÉ UN data-email= {email dinamico de usuario desde variable de handlebars} Y ACA LO RECUPERO        
        let idCart = localStorage.getItem(email) // YA CON ESE EMAIL VERIFICO SI HAY ALGUN ID DE CARRITO EN EL LOCALSTORAGE
        if (rol == 'Administrador') {
            let botonAgregarProducto = document.querySelector('.botonAgregarProductos');
            botonAgregarProducto.style.display = 'none'
        } else {
            let botonCrearProductos = document.querySelector('.crearProductos');
            botonCrearProductos.style.display
                = 'none'
            nav.innerHTML = `<a id="botonCarrito" href="/carts/${idCart || "cartEmpty"}" class="botonLogout" >Ir al carrito</a>`
            //SI ES LA PRIMERA VEZ DEL USUARIO EL idCart VA A SER NULL POR ENDE LA RUTA SE ARMA CON cartEmpty
        }
    }
})()

/* ---------------- FUNCION PARA AGREGAR PRODUCTOS AL CARRITO EN NAVEGADOR---------------- */
async function addToCart(pid, email) {
    try {
        //1° VEZ SE CREA UN CARRITO Y SE GUARDA EL ID EN localStorage
        //2° en adelante SE TOMA ESE ID PARA NO VOLVER A CREARLO
        let idCart = localStorage.getItem(email)
        if (!idCart) {
            //CREACION DE CARRITO
            let response = await fetch(`/api/carts/`, {
                method: 'POST'
            })
            let newCart = await response.json()
            idCart = newCart._id

            //GUARDADO DE ID DE CARRITO PARA EL RESTO DE PETICIONES
            localStorage[email] = idCart
            alert('Carrito creado ok')
            document.getElementById('botonCarrito').setAttribute('href', `/carts/${idCart}`); //AL CREAR UN CARRITO SETEO LA RUTA DEL BOTON "Ir al carrito" CON EL NUEVO ID REEMPLAZANDO EL "cartEmpty"
        }
        //SE AGREGA PRODUCTO
        let prod = await fetch(`/api/carts/${idCart}/product/${pid}`, {
            method: 'POST'
        })
        prod = await prod.json()
        if (prod.error) {
            alert('Error al agregar producto!')
        } else {
            alert('Producto agregado con exito!!')
        }
    } catch (error) {
        console.error(error)
    }
}
let botonesBLOQUEADOS = document.querySelectorAll(`.botonAgregarCarrito`)

for (let i = 0; i < botonesBLOQUEADOS.length; i++) {
    if (botonesBLOQUEADOS[i].dataset.owner == email) {
        botonesBLOQUEADOS[i].textContent = 'PRODUCTO PROPIO PROHIBIDO COMPRAR'
        botonesBLOQUEADOS[i].disabled = true
        botonesBLOQUEADOS[i].style.color = 'red'
        botonesBLOQUEADOS[i].style.backgroundColor = 'white'
    } else if (rol == 'Administrador') {
        botonesBLOQUEADOS[i].textContent = 'EL ADMINISTRADOR NO PUEDE COMPRAR'
        botonesBLOQUEADOS[i].disabled = true
        botonesBLOQUEADOS[i].style.color = 'blue'
        botonesBLOQUEADOS[i].style.backgroundColor = 'white'
    }
}
