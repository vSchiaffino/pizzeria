class Schema{
    constructor()
    {
        this.databases = {}
    }

    defineDatabase(db)
    {
        /*
        db = {
            campo: tipo
        }
        */
       this.databases[db.name] = db;
    }
}