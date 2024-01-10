const allUsersHandler = async (req, res) => {
    try {
        console.log("allUsersHandler");
    } catch (error) {
        res.status(404).send("Not Found allUsersHandler")
    }
};


module.exports = allUsersHandler;