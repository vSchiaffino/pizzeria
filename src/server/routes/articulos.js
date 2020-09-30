const { getArticulos,
        GetArticuloById,
        delArticulo,
        modArticulo,
        newArticulo } = require('../../database/articulos/articulos')
const checkAuthorization = require('../checkAuthorization');

module.exports = (app) => {
    // Get all article
    app.get('/articulos', async (req, res) => {
        const art = await getArticulos();
        res.json(art);
    });
    // Get one article
    app.get('/articulos/:id', async (req, res) => {
        res.json(await GetArticuloById(req.params.id));
    });
    // New article.
    app.post('/articulos', async (req, res) => {
        if (checkAuthorization(req, res))
            res.json(await newArticulo(req.body));
    });
    // Modify article
    app.put('/articulos/:id', async (req, res) => {
        if (checkAuthorization(req, res))
            return res.json(await modArticulo(req.params.id, req.body));
    });
    // Remove article
    app.delete('/articulos/:id', async (req, res) => {
        if (checkAuthorization(req, res))
            return res.json(await delArticulo(req.params.id));
    });

    return app
}