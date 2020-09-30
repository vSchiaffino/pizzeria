const { userLogin, newUser, modUser, checkToken } = require('../../database/users/users')

module.exports = (app) => {
    // Users login
    app.post('/users/login', async (req, res) => {
        const ret = await userLogin(req.body.usuario, req.body.contraseña) 
        res.json(ret);
    });
    // new user
    app.post('/users', async (req, res) => {
        // usuario: string
        // contraseña: string(encrypted)
        // nombre: string
        // calle1: string
        // calle2: string
        // direccion: string
        res.json(await newUser(req.body));
    });
    // mod user
    app.put('/users/:id', async (req, res) => {
        if (!await checkToken(req.headers.authorization, req.params.id))
        {
            return res.json({ok:false, error: 'You dont have rights to do that.'})
        }
        return res.json(await modUser(req.body, req.params.id));
    })

    return app;
}