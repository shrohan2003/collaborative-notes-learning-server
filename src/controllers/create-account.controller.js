const pool = require("../database/db.js");


async function createAccount(req, res) {
    try {
        const { email, password } = req.body ?? {}

        if (!email || !password) {
            return res.status(400).json({ message: 'Email and password are required.' })
        }

        // will add DB logic
        console.log('email: ' + email + '; password: ' + password)

        // write into DB
        const dbResult = await pool.query(
            `INSERT INTO users (email, encrypted_password)
            VALUES ($1, $2)
            RETURNING user_id, email`,
            [email, password]
        )

        console.log(dbResult);

        res.status(200).json({
            message: 'Account created successfully!!',
            // result: JSON.stringify(dbResult.rows[0]) // dbResult.rows.size() == 0 ---> not found; dbResult.rows.size() == 1 ---> found; dbResult.rows.size() == 2,3,... -----> Error
        })
    } catch (error) {
        console.error("Error happened: " + error);

        res.status(500).json({
            message: 'Account creation failed'
        })
    }
}

module.exports = {
    createAccount
}