const pool = require('../database')
const crypto = require('crypto')

const getUserById = async (id) => {
    const ret = await pool.query(`SELECT * FROM users WHERE id = ${id}`);
    if(ret.length <= 0) return undefined
    else return ret[0];
}

exports.userLogin = async (user, password) => {
    let retErr = {ok: false, error: 'Combinación de usuario y contrasena no encontrado'};
    let us = await pool.query(`SELECT * FROM users WHERE usuario = '${user}'`);
    if(us.length <= 0)
        return retErr;
    else
    {
        const u = us[0];
        const hashed_pass = crypto.createHash('sha256').update(password).digest('base64')
        if(u.usuario == user && hashed_pass == u.contrasena)
        {
            delete u.contrasena;
            return {ok: true, user: u};
        }
        else
        {
            return retErr;
        }
    }
}

exports.newUser = async(u) => {
    // usuario, contraseña, nombre, calle1, calle2, direccion
    const hashed_pass = crypto.createHash('sha256').update(u.contrasena).digest('base64');
    const for_hash = `${process.env.SUDO_KEY}.${u.usuario}.${u.contrasena}`
    const tok = crypto.createHash('sha256').update(for_hash).digest('base64');

    const cmd = `INSERT INTO users(usuario, contrasena, nombre, puntos, calle1, calle2, direccion, token)
                 VALUES('${u.usuario}', '${hashed_pass}', '${u.nombre}', 0, '${u.calle1}', '${u.calle2}', '${u.direccion}', '${tok}')`
    try
    {
        await pool.query(cmd);
        u.token = tok;
        delete u.contrasena;
        return {ok: true, user: u}
    }
    catch (err)
    {
        return {ok: false, error: err}
    }
}

exports.checkToken = async (token, id) => {
    const user = await getUserById(id);
    return user.token === token
}

exports.modUser = async(u, id) => {
    // nombre, calle1, calle2, direccion
    // const cmd = `UPDATE users SET 
    //             nombre = '${u.nombre}',
    //             calle1 = '${u.calle1}',
    //             calle2 = '${u.calle2}',
    //             direccion = '${u.direccion}'`
    if (!u.nombre && !u.calle1 && !u.calle2 && !u.direccion){
        return {ok: false, error: 'No changes given'}
    }

    let cmd = `UPDATE users SET `
    if (u.nombre) cmd += `nombre = '${u.nombre}',`;
    if (u.calle1) cmd += ` calle1 = '${u.calle1}',`;
    if (u.calle2) cmd += `calle2 = '${u.calle2}',`;
    if (u.direccion) cmd += `direccion = '${u.direccion}',`;
    if(cmd[cmd.length - 1] == ',') cmd = cmd.substr(0, cmd.length - 1);
    cmd += ` WHERE id = ${id}`;
    try
    {
        await pool.query(cmd);
        return {ok: true, user: u}
    }
    catch (err)
    {
        return {ok: false, error: err}
    }
}