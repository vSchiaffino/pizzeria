
module.exports = (req, res) => {
    const auth = req.headers.authorization;
    if(!(auth === process.env.SUDO_KEY))
    {
        res.json({ok: false, error: 'Youre not authorized to do that.'})
        return false;
    }
    return true;
}