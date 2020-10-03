const { checkToken } = require('../../database/users/users');
const checkAuthorization = require('../checkAuthorization');
const { GetArticulosById } = require('../../database/articulos/articulos');
const { addCabecera, addDetalles, getCabeceras } = require('../../database/pedidos/pedidos');

module.exports = (app) => {
    // newPedido
    app.post('/pedidos', async (req, res) => {
        const id = req.body.id;
        const token = req.headers.authorization;
        const user = await checkToken(token, id); 
        if(user)
        {
            let articulos = req.body.articulos;
            let jsonArticulos = await GetArticulosById(articulos);
            let precioArticulos = {};
            jsonArticulos.forEach((a) => {
                precioArticulos[a.id] = a.precio;
            })

            let precioTotal = 0;
            let error = false;
            articulos.forEach(a => {
                let precio = precioArticulos[a];
                if(!precio) error = true;
                precioTotal += precio;
            });
            if(error)
            {
                res.json({ok: false, error: 'Article id not found.'})
                return;
            }
            // const descuentos = req.body.descuentos;
            let cabecera = {
                idusuario: user.id,
                preciototal: precioTotal,
                descuentos: 0
            }
            // detalles
            let detalles = [];
            let articulosCuantificados = {};
            articulos.forEach((a) => {
                let cant = articulosCuantificados[a];
                articulosCuantificados[a] = cant == undefined ? 1 : cant + 1;
            })
            Object.entries(articulosCuantificados).forEach(([id, cantidad]) => {
                detalles.push({idarticulo: id, cantidad});
            })
            let idc = await addCabecera(cabecera);
            return res.json(await addDetalles(idc, detalles));
        }
        else
        {
            res.json({ok: false, error: 'Youre not authorized to do that.'})
        }

    });

    app.get('/pedidos', async(req, res) => {
        if(checkAuthorization(req, res)){
            return res.json(await getCabeceras());
        }
    });
    return app;
}