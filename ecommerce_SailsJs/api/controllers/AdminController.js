/**
 * AdminController
 *
 * @description :: Server-side logic for managing admins
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
		
 allUsers:function(req,res){
 	//var data=req.param("data");
 	//var page=data.page;
	User.find({
  		is_admin: { '!' : [1] }
			}).exec(function (err, result){
			if(err)
				return res.json({status:0,data:err})
			else{
				return res.json({status:1,data:result})
			}


		});

	 },
allAdmins:function(req,res){
	var data=req.param("data");
 	var page=data.page;
	User.find({is_admin:1}).paginate({page: page, limit: 15}).exec(function(err,result){
		if(err)
				return res.json({status:0,data:err})
			else{
				return res.json({status:1,data:result})
			}
	});
},

adminDetails:function(req,res){
	var data=req.param("data");
	var email=data.email;
	User.find({is_admin:1,email:email}).exec(function(err,result){
		if(err)
				return res.json({status:0,data:err})
			else{
				return res.json({status:1,data:result})
			}
	});
},

deleteuser:function(req,res){
	var data=req.param("data");
	var email=data.email;
User.destroy({email:email}).exec(function (err){
  if (err) {
    return res.json({status:0,data:err});
  }
  else{
  	return res.json({status:1,data:"successfully deleted"});
  }
});

},

deletepost:function(req,res){
	var data=req.param("data");
	var id=data.id;
Posting.destroy({id:id}).exec(function (err){
  if (err) {
    return res.json({status:0,data:err});
  }
  else{
  	return res.json({status:1,data:"successfully deleted"});
  }
});

},

allPost:function(req,res){
		var data=req.param("data");
 	var page=data.page;
	Posting.find().paginate({page: page, limit: 15}).exec(function (err, result){
			if(err)
				return res.json({status:0,data:err})
			else{
				return res.json({status:1,data:result})
			}
		});

},

updateAdmin:function(req,res){
	var data=req.param("data");
	var email=data.email;
	var fname=data.firstname;
	var lname=data.lastname;
	var address=data.address;
	User.update({email:email},{firstName:fname,lastName:lname,address:address}).exec(function afterwards(err, updated){

          if (err) {
            return res.json({status:false});
          }
          else{
          User.findOne({email:email}).then(function (found) {
              console.log(found)
             if (found) {
              return res.json({status: true,userData:{user:{id:found.id,email:found.email,
                firstname:found.firstName,lastname:found.lastName,address:found.address,country:found.country,state:found.state,contact:found.contact_no,zip:found.zip,city:found.city,pic:found.pic,color:found.color}}});


             }
             else{
                console.log("no user found");
                return res.json({status:false});
             }


          }).catch(function (err) {
        
        return res.json({status: false});
      });
      }
        });

},

updateAdminPass:function(req,res){
	var data=req.param("data");
    var email=data.email;
    var pass=data.pass;
     var bcrypt = require('bcrypt');
      const saltRounds = 10;
      var hash = bcrypt.hashSync(pass, saltRounds);
      if(email && pass){

      User.update({email:email},{password:hash}).exec(function afterwards(err, updated){
          if(err){
            return res.json({success:0,data:err});

          }
          else{
            return res.json({success:1});
          }


      });
    }
    else{
    	 return res.json({success:0,error:"error email and password missing"});
    }
  },

  createAdmin:function(req,res){
  	var data=req.param("data");
  	var email=data.email;
  	var pass=data.pass;
  	var fname=data.firstname;
  	var lname=data.lasntname;
  	var address=data.address;
  	var bcrypt = require('bcrypt');
    const saltRounds = 10;
    var hash = bcrypt.hashSync(pass, saltRounds);
    User.findOne({email:email}).then(function(found){
    	if(found){
    		console.log("in found");
    		console.log(found);
    		return res.json({status:0,data:"email already exit"});
    	}
    	else{
    		 User.create({
            firstName: fname,
            lastName: lname,
            email: email,
            password: hash,
            address:address,
            email_verified:1,
            is_admin:1
          }).then(function (inserted) {
          			console.log("in inserted");
          			console.log(inserted);
          		return res.json({status:1,data:"success"});

          	


          	}).catch(function(err){
console.log("in first catch");
console.log(err);
          		return res.json({status:0,data:err});
   			 });


    	}

    }).catch(function(err){
    	console.log("in 2nd catch");
    	console.log(err);
    	return res.json({status:0,data:err});

    });
     

  },
  updateUser:function(req,res){
  	var data=req.param("data");
  	var fname=data.firstName;
  	var lname=data.lastName;
  	var country=data.country;
  	var state=data.state;
  	var email=data.email;

   User.update({email:email},{firstName:fname,lastName:lname,country:country,state:state}).exec(function afterwards(err, updated){
             
   		if(err){
   			return res.json({status:0,data:err});
   		}
   		else{
   			return res.json({status:1,data:updated});
   		}
  });

},
adminAllPost:function(req,res){
Posting.find().exec(function(err,result){

if(err){
	return res.json({status:0,data:err});

}
else{
	return res.json({status:1,data:result});
}

});

},


};

