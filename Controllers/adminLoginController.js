const Admin = require('../Models/Admin/Admin')
const bcrypt = require('bcrypt')

const adminLogin = async (req, res) => {
    const {email, password} = req.val
    console.log(`email from val ${email}`)
    console.log(password)

    const admin = await Admin.findOne({email})
    if (!admin) {
        res.status(404).json({message:`Admin email does not exist`})
    } else {
        const adminPassword = admin.password
        console.log(adminPassword)
        try {
            const match = await bcrypt.compare(password, adminPassword);
            if(match){
                res.status(200).json({message: `Admin logged in successfully`});
            } else {
                res.status(400).json({error: `password is incorrect`})
            }
        } catch (error) {
            res.status(500).send(`Internal server error ${error}`)
        }
    }
    
}

module.exports = adminLogin