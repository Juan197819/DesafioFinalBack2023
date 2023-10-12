export function dtoProductToTicket(arrayProd) {
    return arrayProd.map(p => {
        return {
            product: p.product.title,
            description: p.product.description,
            price: p.product.price,
            quantity: p.quantity,
        }
    })
}