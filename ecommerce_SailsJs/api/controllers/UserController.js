/**
 * UserController
 *
 * @description :: Server-side logic for managing registerusers
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
var fs = require('file-system');




// pools will use environment variables
// for connection information
module.exports = {
 users:function(req,res){
  console.log("jelllll")
  User.query("SELECT public.user.email As text ,public.user.id As id,public.user.color AS color FROM public.user"
  ,[] ,function(err, rawResult) {

      if(err){
        return res.json({result:err})
      }
      else{

        return res.json({result:rawResult.rows})
      }

  // (result format depends on the SQL query that was passed in, and the adapter you're using)

  // Then parse the raw result and do whatever you like with it.



});

 },
  socialRegistration:function(req,res){

     var parse = req.param("data");
     console.log(parse);
     console.log(parse.email)

    var chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz";
    var string_length = 8;
    var randomstring = '';
    for (var i=0; i<string_length; i++) {
      var rnum = Math.floor(Math.random() * chars.length);
      randomstring += chars.substring(rnum,rnum+1);
    }
    var token =randomstring;
    var email=parse.email;
    var name=parse.name;
    if(!name){
      name="empty";
    }
    var pic=parse.pic;
    var bcrypt = require('bcrypt');
    if(email){
      const saltRounds = 10;
      var hash = bcrypt.hashSync(token, saltRounds);
       User.findOne({email:email}).exec(function(err,result){
            if(err){
              return res.json({status:0,error:err});
            }
            else if(result){
              return res.json({status:2,found:result});
            }
            else{

                 User.create({
                  email:email,
                  password: hash,
                  pic:pic,
                  firstName:name

                  }).then(function (inserted) {
                     var id=inserted.id;
            console.log(id);
            var nodemailer = require('nodemailer');
            var hbs=require('nodemailer-express-handlebars');
            var transporter = nodemailer.createTransport({
              service:'gmail',
              host: ' smtp.gmail.com',
              port: 587,
              secure: false, // secure:true for port 465, secure:false for port 587
              auth: {
                user: 'otexmailer@gmail.com',
                pass: 'otexmailer123'
              },
              tls:{
                rejectUnauthorized:false
              }
            });
            var htmlMsg="<!DOCTYPE html><html><body><h1>Verify Email</h1><form method='post' action='http://ecommerce-freelance.herokuapp.com/verify-email'><input type='hidden' name='token' value="+token+"><input type='hidden' name='id' value="+id+"><input type='submit' class='btn btn-primary' value='Verify Email'><h4>Your password is "+hash +"</h4></form></body></html>";
            transporter.use('compile',hbs({
              viewPath:'views',
              extName: '.hbs'
            }));


            data = {
              // from: 'Mail Gun wds <postmaster@sandboxb5fe631e4f174ae0b1b3e37e4d3cb83c.mailgun.org>',
              from:'tawab2013@gmail.com',
              to: email,
              subject:name,
              template: 'registerMail',
              context:{token:token,id:id}
            };

            transporter.sendMail(data, (error, info) => {
              console.log(info);
              if(!error)
              {
              console.log("success");
              return res.json({status:1,success:1});
              }
              else
              {
               console.log("errorrrrrrrrrrrrrrrrrrrrrrrr");
               return res.json({status:0,error:err});
              }
            });
          }).catch(function (err) {
                    console.log(err);
                    return res.json({status:0,error:err});
                  });
           }
     });

    }



  },
	register:function(req,res) {



    console.log(req.param("data"));
    var parse = req.param("data");
    parse=JSON.parse(parse);
    var chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz";
    var string_length = 8;
    var randomstring = '';
    for (var i=0; i<string_length; i++) {
      var rnum = Math.floor(Math.random() * chars.length);
      randomstring += chars.substring(rnum,rnum+1);
    }
    var token =randomstring;
    var fname = parse.firstname;
    var lname = parse.lastname;
    var email = parse.email;
    var password = parse.password;
    var country = parse.country;
    var state = parse.state;
    var address = parse.address;
    var gender = parse.gender;
    var contact=parse.contact;
    console.log(contact)
    var city=parse.city;
    var zip=parse.zipcode;
    var pic;
    if(!contact){
      contact=0;
    }
    var bcrypt = require('bcrypt');

    if (fname && lname && email && password && country && state && address && gender) {
      console.log("All data varaible are Ok!");
      const saltRounds = 10;
      var hash = bcrypt.hashSync(password, saltRounds);

      User.findOne({email: email}).then(function (finn) {
        if (finn) {
          return res.json({found: email});
        }
        else {
          req.file('files').upload({
      // don't allow the total upload size to exceed ~10MB

      saveAs: ''+email+'.png',
      dirname: '../../assets/profiles/'
    },function (err, uploadedFiles){
          if(err){
            return res.json({error:err});
          }
          if (uploadedFiles || err){

          User.create({
            firstName: fname,
            lastName: lname,
            email: email,
            password: hash,
            country: country,
            state: state,
            address: address,
            gender: gender,
            email_token:token,
            contact_no:contact,
            zip:zip,
            city:city,
            pic:''+email+'default.png'
          }).then(function (inserted) {
            var id=inserted.id;
            console.log(id);
            var nodemailer = require('nodemailer');
            var hbs=require('nodemailer-express-handlebars');
            var transporter = nodemailer.createTransport({
              service:'gmail',
              host: ' smtp.gmail.com',
              port: 587,
              secure: false, // secure:true for port 465, secure:false for port 587
              auth: {
                user: 'aizazshahid47@gmail.com',
                pass: 'hamayara'
              },
              tls:{
                rejectUnauthorized:false
              }
            });
            var htmlMsg="<!DOCTYPE html><html><body><h1>Verify Email</h1><form method='post' action='http://ecommerce-freelance.herokuapp.com/verify-email'><input type='hidden' name='token' value="+token+"><input type='hidden' name='id' value="+id+"><input type='submit' class='btn btn-primary' value='Verify Email'></form></body></html>";
            transporter.use('compile',hbs({
              viewPath:'views',
              extName: '.hbs'
            }));


            data = {
              // from: 'Mail Gun wds <postmaster@sandboxb5fe631e4f174ae0b1b3e37e4d3cb83c.mailgun.org>',
              from:'tawab2013@gmail.com',
              to: email,
              subject:fname,
              template: 'registerMail',
              context:{token:token,id:id}
            };

            transporter.sendMail(data, (error, info) => {
              console.log(info);
              if(!error)
              {
              console.log("success");

              }
              else
              {
               console.log("errorrrrrrrrrrrrrrrrrrrrrrrr");
               console.log(error);
              }
            });


            return res.json({success: 1});
          }).catch(function (err) {
            console.log(err);
            return res.json({error: 0});
          });
        }
          });
        }


      }).catch(function (err) {
        console.log(err);
        return res.json({error: 0});
      });

    }
    else {
      return res.json({empty: 0});
    }

  },

	login:function(req,res){
    var parse = req.param("data");
    console.log("in the function");
    var bcrypt = require("bcrypt");
    var email = parse.email;
    var pass = parse.password;
    if (email && pass) {

      User.findOne({email: email}).then(function (found) {
        if (found) {


          bcrypt.compare(pass, found.password, function(errr, bresult) {
                console.log(bresult);


            if(bresult==true )
            {
              console.log(found.email_verified);
               console.log(found.email_token);
              if(found.email_verified==1 && found.email_token ==null){
                console.log("verified");
                return res.json({status: true,userData:{user:{id:found.id,email:found.email,
                firstname:found.firstName,lastname:found.lastName,address:found.address,country:found.country,state:found.state,gender:found.gender,city:found.city,zip:found.zip,pic:found.pic,contact:found.contact_no,color:found.color,is_admin:found.is_admin}}});

              }
              else{
                console.log(" NOT verified");
                  return res.json({verified: 0});
              }



            }
            else{
              console.log("false bresutl")
                return res.json({status: false});
            }
          });

        }
        else{
           return res.json({status: false});

        }
      }).catch(function (err) {
        console.log(err);
        return res.json({status: false});
      });
    }
    else {
      return res.json({status:false});
    }
  },
  verifyEmail:function(req,res){
    var token = req.param("token");
    var id = req.param("id");
    if(id && token){
    User.find({id:id,email_token:token}).then(function(found){
      if(found){
        User.update({email_token:token},{email_token:null,email_verified:1}).exec(function afterwards(err, updated){

          if (err) {
            return res.json({status:false});
          }

          console.log('email verified');
          return res.json({status:true});
        });
      }
      else{
        return res.json({status:false});
      }
    }).catch(function(error){
      return res.json({status:false});
    });
  }
  else{
    return res.json({status:false});
  }
},
  forgetPassword:function(req,res){
    var parse = req.param("data");
    var email = parse.email;
    var chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz";
    var string_length = 8;
    var randomstring = '';
    for (var i=0; i<string_length; i++) {
      var rnum = Math.floor(Math.random() * chars.length);
      randomstring += chars.substring(rnum,rnum+1);
    }
    var npass =randomstring;
    var bcrypt = require('bcrypt');
    const saltRounds = 10;
    var hash = bcrypt.hashSync(npass, saltRounds);
    if(email){
      User.find({email:email}).then(function(found){
        console.log("found emailsdsd");
        console.log(found.length);
        if(found && found.length !=0) {
        console.log("in found");
          var nodemailer = require('nodemailer');
          var hbs=require('nodemailer-express-handlebars');
          var transporter = nodemailer.createTransport({
            service:'gmail',
            host: ' smtp.gmail.com',
            port: 587,
            secure: false, // secure:true for port 465, secure:false for port 587
            auth: {
              user: 'aizazshahid47@gmail.com',
              pass: 'hamayara'
            },
            tls:{
              rejectUnauthorized:false
            }
          });

          var htmlMsg="<!DOCTYPE html><html><body><h1>New Password!</h1><h2>Password:"+npass+"</h2></body></html>";

          transporter.use('compile',hbs({
              viewPath:'views',
              extName: '.hbs'
            }));

          data = {
            // from: 'Mail Gun wds <postmaster@sandboxb5fe631e4f174ae0b1b3e37e4d3cb83c.mailgun.org>',
            from:'aizazshahid47@gmail.com',
            to: email,
            subject:'New Password',
            template: 'passwordMail',
            context:{npass:npass}

          };

          transporter.sendMail(data, (error, info) => {
            console.log(info);
          if(!error)
          {
            console.log("success");
            User.update({email:email},{password:hash}).exec(function(err, updated){

              if (err) {
                console.log(err);
                console.log("in err");
                return res.json({status:false});
              }

              console.log('email verified');
              return res.json({status:true});
            });

          }
          else
          {
            console.log("errorrrrrrrrrrrrrrrrrrrrrrrr");
            console.log(error);
            return res.json({status:false});
          }
        });

        }
        else{
          return res.json({status:false});
        }
      }).catch(function(error){
        return res.json({status:false});
      });
    }
    else{
      return res.json({status:false});
    }
  },
  userProfile:function(req,res) {
    var email=req.param("email");
    User.find({email: email}).then(function(finn){
      return res.json({succes:finn});


    }).catch(function (err) {
        console.log(err);
        return res.json({error: 0});
      });
  },
  updatePass:function(req,res){
    var data=req.param("data");
    var email=data.email;
    var pass=data.pass;
     var bcrypt = require('bcrypt');
      const saltRounds = 10;
      var hash = bcrypt.hashSync(pass, saltRounds);
      if(email && pass){

      User.update({email:email},{password:hash}).exec(function afterwards(err, updated){
          if(err){
            return res.json({error:err});

          }
          else{
            return res.json({success:1});
          }


      });
    }
    else{
      return res.json({empty:1});
    }




  },

  updateProfile:function(req,res){
console.log(req.param("data"));
     var data=req.param("data");
     data=JSON.parse(data);
     var email=data.email;
     var address=data.address;
     var country=data.country;
     var state=data.state;
    var city=data.city;
    var zip=data.zip;
     var fname=data.firstname;
     var lname=data.lastname;
     var contact=data.contact;
     var zip=data.zip;
     var city=data.city;
     console.log("update profile");
     console.log(contact);



     if(email && fname && lname){

       var paths="https://ecommerce-freelance.herokuapp.com/profiles/"+email+".png";
       fs.unlink(paths, function(err) {
         if (err) return console.log(err); // handle error as you wish

         // file deleted... continue your logic
       });


         req.file('files').upload({
           // don't allow the total upload size to exceed ~10MB

           saveAs: ''+email+'.png',
           dirname: '../../assets/profiles/'
         },function (err, uploadedFiles) {
           console.log("status:");
           console.log(uploadedFiles);
           console.log("error:");
           console.log(err);
         });





              User.update({email:email},{city:city,zip:zip,address:address,firstName:fname,lastName:lname,country:country,state:state,contact_no:contact}).exec(function afterwards(err, updated){
               if(err){
                 console.log("lala g");
                 return res.json({error:err});
                  }

          else{
              console.log("updated");
              console.log("email is=?");
              console.log(email);
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
        console.log(err);
        console.log("baba g");
        return res.json({status: false});
      });

     }
   });

  }

},
ifExist:function(req,res){
    var email=req.param("email");
    console.log(email);
    User.findOne({email:email}).then(function (found) {
        if (found) {
          console.log(found);

          return res.json({status:1,userData:{user:{id:found.id,email:found.email,
                firstname:found.firstName,lastname:found.lastName,address:found.address,country:found.country,state:found.state,contact:found.contact_no,zip:found.zip,city:found.city,pic:found.pic,color:found.color}}});
        }
        else{
          return res.json({status:0});
        }

    }).catch(function(err){
      console.log(err);
    return res.json({status:2,error:err});
  });
},





};

