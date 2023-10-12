export function dtoArrayProducts(response) {
    const prod = response.payload.map(dtoProduct)
    return prod
}
export function dtoProduct(product) {
    return {
        id: product._id,
        title: product.title,
        description: product.description,
        price: product.price,
        stock: product.stock,
        category: product.category,
        thumbnail: product.thumbnail
    }
}