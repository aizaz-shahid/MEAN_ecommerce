/**
 * UserController
 *
 * @description :: Server-side logic for managing registerusers
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
  getCategories:function(req,res){
    Categories.find(function findAll(err, categories) {
      if(!err) {
        console.log("got categories");
        return res.json({status:true,categories:categories});
      }
      else{
        console.log("error");
        return res.json({status:false});
      }
    });
  },
  insertCategory:function (req,res) {
    var parse=req.param("data");
    var name=parse.name;
    var description=parse.description;
    if(name && description) {
      Categories.findOne({name:name}).then(function (found) {
        if(found){
          return res.json({status:false,msg:"category already exists"});
        }
        else{
          Categories.create({
            name:name,
            description:description
          }).then(function (finn) {
            if(finn){
              return res.json({status:true});
            }
            else{
              return res.json({status:false});
            }
          }).catch(function () {
            return res.json({status:false});
          });
        }
      }).catch(function (error) {
        return res.json({status:false});
      });
    }
    else{
      return res.json({status:false});
    }
  },
  insertSubCategory:function (req,res) {
    var parse=req.param("data");
    var name=parse.name;
    var description=parse.description;
    var cat_id=parse.category_id;
    Categories.findOne({id:cat_id}).then(function (found) {
      if(found){
        if(name && description) {
          Subcategories.findOne({name:name}).then(function (found) {
            if(found){
              return res.json({status:false,msg:"category already exists"});
            }
            else{
              Subcategories.create({
                name:name,
                description:description,
                category_id:cat_id
              }).then(function (finn) {
                if(finn){
                  return res.json({status:true});
                }
                else{
                  return res.json({status:false});
                }
              }).catch(function () {
                return res.json({status:false});
              });
            }
          }).catch(function (error) {
            return res.json({status:false});
          });
        }
        else{
          return res.json({status:false});
        }
      }
      else{
        return res.json({status:false,msg:"category does not exist"});
      }
    }).catch(function (error) {
      return res.json({status:false});
    });

  },
  getSubcategories:function (req,res) {
    var parse=req.param("category");
    var cat_id=parse.category_id;
    Subcategories.find({category_id:cat_id}).then(function (found) {
      if(found){
        return res.json({status:true,subcategories:found});
      }
      else{
        return res.json({status:false});
      }
    }).catch(function (error) {
      return res.json({status:false});
    });

  },
  insertAttribute:function(req,res){
    var parse=req.param("data");
    var name=parse.name;
    var description=parse.description;
    var type=parse.type;
    var sub_cat=parse.subcategory_id;
    sails.log("insert attribute id");
    sails.log(sub_cat);
    if(name && description && sub_cat){

          Attribute.create({name:name,description:description,sub:sub_cat,type:type}).then(function (finn) {
              if(finn){
                  return res.json({status:true});
                }
                else{
                  return res.json({status:false});
                }
          }).catch(function (error) {
            sails.log(error);
            return res.json({status:false});
          });
    }
    else{
       return res.json({status:false});

    }

  },

  getAttributes:function(req,res){
    var sub_cat=req.param("sub_category");

    sails.log(sub_cat);
    Subcategories.find({id:sub_cat}).populate('attribute').exec(function (err,attirbutes) {
      if(err){
        console.log(err);
       return res.json({status:false});
      }
      else{
           return res.json({status:true,attributes:attirbutes});
      }




  });
},
updateCategories:function(req,res){

  var data=req.param("data");
  console.log(data);
  var name=data.name;
  console.log(name);
  var description=data.description;
  console.log(description);
  var id=data.id;
  console.log(id);
  Categories.update({id:id},{name:name,description:description}).exec(function(err,updates){
    if(err){
      return res.json({status:0,data:err});
    }
    else{
      return res.json({status:1,data:updates});

    }


  });
},

updateSubCategories:function(req,res){
  var data=req.param("data");
  var name=data.name;
  var description=data.description;
  var id=data.id;
  Subcategories.update({id:id},{name:name,description:description}).exec(function(err,updates){
    if(err){
      return res.json({status:0,data:err});
    }
    else{
      return res.json({status:1,data:updates});

    }


  });
},
updateAttributes:function(req,res){
  var data=req.param("data");
  var name=data.name;
  var description=data.description;
  var type=data.type;
  var id=data.id;
  Attribute.update({id:id},{name:name,description:description,type:type}).exec(function(err,updates){
    if(err){
      return res.json({status:0,data:err});
    }
    else{
      return res.json({status:1,data:updates});

    }


  });
},


deleteCategories:function(req,res){
  var data=req.param("data");
  var id=data.id;
  Categories.destroy({id:id}).exec(function (err){
  if (err) {
    return res.json({status:0,data:err});
  }
  else{
    return res.json({status:1,data:"successfully deleted"});
  }
});
},

deleteSubCategories:function(req,res){
  var data=req.param("data");
  var id=data.id;
  Subcategories.destroy({id:id}).exec(function (err){
  if (err) {
    return res.json({status:0,data:err});
  }
  else{
    return res.json({status:1,data:"successfully deleted"});
  }
});

},
deleteAttributes:function(req,res){
  var data=req.param("data");
  var id=data.id;
  Attribute.destroy({id:id}).exec(function (err){
  if (err) {
    return res.json({status:0,data:err});
  }
  else{
    return res.json({status:1,data:"successfully deleted"});
  }
});
},

  getAllsubcategories:function(req,res){
    Subcategories.find(function findAll(err, categories) {
      if(!err) {
        console.log("got categories");
        return res.json({status:true,data:categories});
      }
      else{
        console.log("error");
        return res.json({status:false});
      }
    });
  },
    getAllattributes:function(req,res){
    Attribute.find(function findAll(err, categories) {
      if(!err) {
        console.log("got categories");
        return res.json({status:true,data:categories});
      }
      else{
        console.log("error");
        return res.json({status:false});
      }
    });
  },

};
