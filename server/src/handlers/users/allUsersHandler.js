const { allUsers } = require("../../controllers/users/getAllUsers")
const allUsersHandler = async (req, res) => {
    try {
        const response = await allUsers()
        res.status(200).json(response)
    } catch (error) {
        res.status(404).send("Error finding users, please check your request.")
    }
};


module.exports = allUsersHandler;