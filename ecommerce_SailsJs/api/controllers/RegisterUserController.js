/**
 * RegisterUserController
 *
 * @description :: Server-side logic for managing registerusers
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	
	register:function(req,res){
		console.log("register api");
		console.log(req.param("data"));
		var parse=req.param("data");
		console.log(parse);
		console.log(parse.firstname);

		var fname=parse.firstname;
		var lname=parse.lastname;
		var email=parse.email;
		var password=parse.password;
		var country=parse.gender;
		var state=parse.country;
		var address=parse.state;
		var gender=parse.address;
		var bcrypt = require('bcrypt');
		
		if(fname && lname && email && password && country && state && address && gender){
			console.log("All data varaible are Ok!");
			const saltRounds = 10;
			var hash = bcrypt.hashSync(password, saltRounds);
		
			User.findOne({email:email}).then(function (finn){
  			if (finn) {
    			return res.json({found:email});
    		}
    		else{
    			User.create({firstName:fname,lastName:lname,email:email,password:hash,country:country,state:state,address:address,gender:gender}).then(function(inserted){
    				return res.json({success:1});
    			}).catch(function(err){
    				console.log(err);
    				return res.json({error:0});
    		   });
    		}
 		 	
 		 	}).catch(function (err){
 		 			console.log(err);
 		 		return res.json({error:0});
			});

		}
		else{
			return res.json({empty:0});
		}

	},

	/*forgetPass:function(req,res){
		var data=req.param("data");
		var email=data.email;
		if(email){

			User.findOne({email:email}).then(function (finn){
  			if (finn) {
  					
    			
    		}
    		else{
    			return res.json({error:"not found"});

    		}

		});
		else{
			return res.json({empty:0});
		}

	}*/
};

