/**
 * User.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {
migrate:'alter',
  attributes: {

  
  	id:{
  		type:'integer',
  		autoincrement:true,
    	unique: true
  	},
    pic:{
      type:'string'
    },
  	firstName:{
  		type:'string'
  	},
  	lastName:{
  		type:'string'
  	},
	email:{
  		type:'string',
  		 primaryKey: true,
    	 unique: true
  	},
  	password:{
  		type:'string',
  		minLength: 8
  	},
  	country:{
  		type:'string'
  	},
  	state:{
  		type:'string'
  	},
  	address:{
  		type:'string'
  	},
    email_token:{
      type:'string'
    },
    email_verified:{
      type:'integer'
    },
  	gender:{
  		type:'string'
  	},
    contact_no:{
      type:'string'
    },
    zip:{
      type:'string'
    },
    city:{
      type:'string'
    },
    color:{
      type:'string',
       defaultsTo : '#ff0000'
    },
    is_admin:{
      type:'integer',
      defaultsTo:'0'
    }
  },
 	 tableName: 'user'
};

