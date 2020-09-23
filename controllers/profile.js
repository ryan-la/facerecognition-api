const handleProfileGet = (req, res, db) => {
    const { id } = req.params;
    db.select('*').from('users')
        //where id is the id we received in the params    
        .where({
            id: id
        })
        .then(user => {
            if (user.length) {
                // returns back an array so want the first one which is the one selected
                res.json(user[0])
            } else {
                res.status.json("not found")
            }
        })
        .catch(err => res.status(400).json("Error getting user"))
}

module.exports = {
    handleProfileGet: handleProfileGet
}