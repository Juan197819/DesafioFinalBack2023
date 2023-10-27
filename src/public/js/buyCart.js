if (location.href != 'http://localhost:8080/carts/cartEmpty') {
    let subtotales = document.querySelectorAll('.subtotal span')

    let precios = document.querySelectorAll('.precio span')
    let cantidades = document.querySelectorAll('.cantidad')
    let totalCarrito = document.getElementById('valorCarritoTotal')
    let total = 0
    for (let i = 0; i < subtotales.length; i++) {
        subtotales[i].innerHTML = precios[i].textContent * cantidades[i].textContent
        total += Number(subtotales[i].innerHTML)
    }
    totalCarrito.innerHTML = total
}
async function buyCart(cid) {
    try {
        const response = await fetch(`http://localhost:8080/api/carts/${cid}/purchase`, {
            method: 'POST',
        })
        const r = await response.json()
        if (r.articleOutOfStock.length) {
            if (r.articleBuyed.length) {
                alert(`Compra Realizada parcialmente, revise su casilla de correo para mas detalles...`)
            }
            alert('Los productos que todavia figuran en su carrito actualmente no tienen stock')
            location.reload()
        } else {
            localStorage.removeItem(localStorage.key(cid))
            location.replace(`http://localhost:8080/carts/cartEmpty`)
            alert('Carrito comprado con exito')
        }
    } catch (error) {
        console.error(error)
    }
}
