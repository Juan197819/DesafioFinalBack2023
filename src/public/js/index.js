/* -------------------------------------------------------------------------- */
/*                                 WEBSOCKETS                                 */
/* -------------------------------------------------------------------------- */
const socket = io.connect()

const form = document.getElementById('form')
const tbody = document.getElementById('tbody')
if (form) {
    form.addEventListener('submit',(e)=>{
        e.preventDefault()
        const newProduct= {
            title: document.getElementById('title').value,
            description: document.getElementById('description').value,
            stock: document.getElementById('stock').value,
            category: document.getElementById('category').value,
            code: document.getElementById('code').value,
            price: document.getElementById('price').value,
            thumbnail: document.getElementById('thumbnail').value,
            status:true,
        }
        socket.emit('messageClient',newProduct)
    })
}
if (tbody) {
    socket.on('messageServer', data => {
        const i = data.map(p => {
            return (`<tr class='trCart'>
        <td>${p.title}</td>
        <td>${p.description}</td>
        <td>${p.price}</td>
        <td>${p.stock}</td>
        <td>${p.category}</td>
    </tr>`)
        })
        tbody.innerHTML = i.join('')
    })
}
/* ---------------- FUNCION AUTOINVOCADA QUE TOMA EL EMAIL DEL USUARIO LOGUEADO DESDE EL ATRIBUTO "data-email" del H1 PARA ARMAR UN BOTON CON LA RUTA DE PRODUCTOS DEL CARRITO ESPECIFICO PARA ESE USUARIO---------------- */
let nav
(async function () {
    const h1 = document.querySelector('header div h1'); 
    nav = document.getElementById('nav'); 
    if (h1) {
        const email = h1.getAttribute('data-email') //EN EL H1 DEL HTML CREÉ UN data-email= {email dinamico de usuario desde variable de handlebars} Y ACA LO RECUPERO        
        let idCart = localStorage.getItem(email) // YA CON ESE EMAIL VERIFICO SI HAY ALGUN ID DE CARRITO EN EL LOCALSTORAGE
        if (email == 'adminCoder@coder.com') {
            const botonAgregarProducto = document.querySelector('.botonAgregarProductos');
            botonAgregarProducto.style.display = 'none'
        } else {
            const botonCrearProductos = document.querySelector('.crearProductos');
            botonCrearProductos.style.display
                = 'none'
            nav.innerHTML = `<a id="botonCarrito" href="/carts/${idCart || "cartEmpty"}" class="botonLogout" >Ir al carrito</a>`
            //SI ES LA PRIMERA VEZ DEL USUARIO EL idCart VA A SER NULL POR ENDE LA RUTA SE ARMA CON cartEmpty
        }
    }
})()

/* ---------------- FUNCION PARA AGREGAR PRODUCTOS AL CARRITO EN NAVEGADOR---------------- */
async function agregarAlCarrito(pid, email) {
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
    alert('Producto agregado!!')
}