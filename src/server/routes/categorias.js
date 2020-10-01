const { newCategoria, getCategorias } = require('../../database/categorias/categorias')
const checkAuthorization = require('../checkAuthorization');

module.exports = (app) => {
    // Get all categorias
    app.get('/categorias', async (req, res) => {
        const resp = await getCategorias();
        res.json(resp);
    });
    // new Categoria
    app.post('/categorias', async (req, res) => {
        if (checkAuthorization(req, res))
        {
            const resp = await newCategoria(req.body.nombre);
            res.json(resp);
        } 
    })

    return app
}