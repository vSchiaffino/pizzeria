const routeArticulos = require('./routes/articulos')
const routeUsers = require('./routes/users')
const routePedidos = require('./routes/pedidos')
const routeCategorias = require('./routes/categorias')

module.exports = (app) => {
    app = routeArticulos(app)
    app = routeUsers(app)
    app = routePedidos(app)
    app = routeCategorias(app)


    return app;
}