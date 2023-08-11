const Admin = require('../Models/Admin/Admin')

const adminLogin = async (req, res) => {
    const {email, password} = req.val
    console.log(`email from val ${email}`)

    const admin = await Admin.findOne({email})
    if (!admin) {
        res.status(404).json({message:`Admin email does not exist`})
    }

    if (admin){
        const adminPassword = admin.password
        const match = bcrypt.compare(adminPassword, password);
        if(match){
            res.status(200).json({message: `Admin logged in successfully`});
        } else {
            res.status(400).json({error: `password is incorrect`})
        }
    }
}

module.exports = adminLogin