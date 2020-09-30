const routeArticulos = require('./routes/articulos')
const routeUsers = require('./routes/users')
const routePedidos = require('./routes/pedidos')

module.exports = (app) => {
    app = routeArticulos(app)
    app = routeUsers(app)
    app = routePedidos(app)

    return app;
}