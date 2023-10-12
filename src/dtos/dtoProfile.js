export function dtoProfile(user) {
    return {
        id:user._id,
        nombre: user.firstName,
        apellido: user.lastName,
        email: user.email,
        edad: user.age,
        rol: user.role == 'admin' ? 'Administrador' : 'Usuario'
    }
}