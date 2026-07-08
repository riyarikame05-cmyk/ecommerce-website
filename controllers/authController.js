exports.login = async (req, res) => {

try{

const user = await User.findOne({
email:req.body.email
});

if(!user){

return res.status(400).json({
message:"User not found"
});

}

const match = await bcrypt.compare(
req.body.password,
user.password
);

if(!match){

return res.status(400).json({
message:"Wrong password"
});

}

const token = jwt.sign(

{
id:user._id,
role:user.role
},

process.env.JWT_SECRET,

{
expiresIn:"7d"
}

);

res.json({

token,

user:{

_id:user._id,

name:user.name,

email:user.email,

role:user.role

}

});

}catch(err){

console.log(err);

res.status(500).json({
message:"Server Error"
});

}

};