const {allUsers }= require("../../controllers/users/getAllUsers")
const allUsersHandler = async (req, res) => {
    try {
        const response = await allUsers()
        res.status(200).json(response)
    } catch (error) {
        res.status(404).send("Not Found allUsersHandler")
    }
};


module.exports = allUsersHandler;