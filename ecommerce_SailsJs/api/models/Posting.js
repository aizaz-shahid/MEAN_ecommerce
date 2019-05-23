/**
 * Postin.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {
autoCreatedAt: true,
autoUpdatedAt: true,
migrate:'alter',
  attributes: {
  	 id:{
      type:'integer',
      autoincrement:true,
      primaryKey: true,
      unique: true
    },
    attributesValue:{
    	type:'json'
    },
    price:{
      type:'integer'
    },
    name:{
      type:'string'
    },
    rentPeriod:{
      type:'json'
    },
    color:{
      type:'string'
    },
    count:{
      type:'string'
    },
    email:{
    	type:'string'
    },
    image:{
    	type:'string'
    },
    type:{
    	type:'string'
    },
    CatPost:{
    model : 'categories'
  },
  image1:{
    type:'json'
  },
  subPost:{
  	model:'subcategories'
  },
  status:{
    type:'string',
     defaultsTo : 'true'
  },
  delete:{
    type:'string',
     defaultsTo : '0'
  }





  }
};

