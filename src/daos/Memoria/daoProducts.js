class DaoProducts {
    constructor(){
        this.products=[]
    }
    addProduct(title,description,price, thumbnail,stock){
        if(title&&description&&price&& thumbnail&&stock){
            const newProduct = {
                title,
                description,
                price,
                thumbnail,
                stock,
                id:this.products.length + 1
            }
            this.products.push(newProduct)
            return newProduct
        }else{
            return 'Datos incompletos, intentelo nuevamente'
        }
    }
    getProducts(){
        return this.products
    }
    getProductById(id){
        const producto = this.products.find(product=>product.id==id)
        
        if(producto){
            return producto
        }else{
        return 'Not found'
        }
    }
}
export const daoProducts = new DaoProducts()
