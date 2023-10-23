if (location.href != 'http://localhost:8080/carts/cartEmpty') {
    let subtotales = document.querySelectorAll('.subtotal span')

    console.log(subtotales)
    let precios = document.querySelectorAll('.precio span')
    let cantidades = document.querySelectorAll('.cantidad')
    let totalCarrito = document.getElementById('valorCarritoTotal')
    console.log(subtotales)
    let total = 0
    for (let i = 0; i < subtotales.length; i++) {
        console.log(subtotales[i])
        subtotales[i].innerHTML = precios[i].textContent * cantidades[i].textContent
        total += Number(subtotales[i].innerHTML)
    }
    totalCarrito.innerHTML = total
    
}
async function buyCart(cid) {
    const response = await fetch(`http://localhost:8080/api/carts/${cid}/purchase`, {
        method: 'POST',
    })
    const r = await response.json()
    if (r.articleOutOfStock.length) {
        location.reload()
        alert('Los productos que figuran en su carrito actualmente no tienen stock')
    } else {
        console.log('compre todo')
        localStorage.key('653676fa843d09afa14e4dc2')
        localStorage.removeItem(localStorage.key('653676fa843d09afa14e4dc2'))
        location.replace(`http://localhost:8080/carts/cartEmpty`)
        alert ('Carrito comprado con exito')
    }
}
