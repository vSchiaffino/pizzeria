const {Database, dbTypes, filterOperators} = require('../../sql-handler')

// articulos
exports.articulosDb = new Database("articulos", {
    id: dbTypes.NUMBER,
    idcategoria: dbTypes.NUMBER,
    nombre: dbTypes.STRING,
    descripcion: dbTypes.STRING,
    precio: dbTypes.NUMBER,
    referencia: dbTypes.STRING
})
// categorias
exports.categoriasDb = new Database("categorias", {
    id: dbTypes.NUMBER,
    nombre: dbTypes.STRING,
})
// users
exports.userDb = new Database("users", {
    id: dbTypes.NUMBER,
    token: dbTypes.STRING,
    usuario: dbTypes.STRING,
    contraseña: dbTypes.STRING,
    nombre: dbTypes.STRING,
    puntos: dbTypes.NUMBER,
    calle1: dbTypes.STRING,
    calle2: dbTypes.STRING,
    direccion: dbTypes.NUMBER,
})
// pedidosCabecera
exports.pedidosCabeceraDb = new Database("pedidosCabecera", {
    id: dbTypes.NUMBER,
    idusuario: dbTypes.NUMBER,
    precioTotal: dbTypes.NUMBER,
    descuentos: dbTypes.NUMBER,
})
// pedidosDetalle
exports.pedidosDetalleDb = new Database("pedidosDetalle", {
    id: dbTypes.NUMBER,
    idarticulo: dbTypes.NUMBER,
    idcabecera: dbTypes.NUMBER,
})