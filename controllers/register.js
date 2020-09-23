const handleRegister = (req, res, db, bcrypt) => {
    //requests sent by the client to trigger an action on the server
    //response, answer from the server
    const { email, name, password } = req.body;
    const hash = bcrypt.hashSync(password)

    //use trx because multiple operations on a database (user, login)
    db.transaction(trx => {
        //use trx object insert hash and email
        trx.insert({
            hash: hash,
            email: email
        })
            //into login database
            .into('login')
            //return email of the user from database because they both share email
            .returning('email')
            .then(loginEmail => {
                // console.log(loginEmail)
                //return another trx transaction
                return trx('users')
                    //insert into users and then return all the columns in json
                    .returning('*')
                    .insert({
                        email: loginEmail[0],
                        name: name,
                        joined: new Date()
                    })
                    .then(user => {
                        res.json(user[0]); //only want to show user[0] in database, instead of all user array
                    })
            })
            .then(trx.commit)
            .catch(trx.rollback)
    })
        .catch((err) => {
            return res.status(400).json("Unable to register")
        })
}

module.exports = {
    handleRegister: handleRegister
}