async function changeRole(cid) {
    try {
        let response = await fetch(`http://localhost:8080/api/users/premium/${cid}`,
            { method: 'POST' })
        response = await response.json()
        if (response.error) {
            alert('El rol del usuario administrador no puede ser cambiado por este metodo')
        } else {
            alert('Rol cambiado con exito!!')
            location.reload()
        }
    } catch (error) {
        console.error(error)
    }
}