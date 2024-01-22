const { User } = require('../../db');

 const login= async (req, res) => {
 const { email, password } = req.body;
 const user = await User.findOne({ where: { email : email } });
 if (!user) {
    return res.status(400).send({ message: 'Usuario no existe' });
 }

 
 const validPassword = password === user.password;
 
 if (!validPassword) {
    return res.status(400).send({ message: 'Contraseña incorrecta' });
 }

 if( validPassword){
   const response = {
      id:user.id,
      name:user.name,
      surName:user.surName,
      email:user.email
   }
   return res.json(response);
 }

 
};

module.exports = {
    login
}