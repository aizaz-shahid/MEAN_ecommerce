 /**
 * PostingsController
 *
 * @description :: Server-side logic for managing Postings
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	savepostings:function(req,res){
   	var data=req.param("data");
    console.log(data);

   	data=JSON.parse(data);
   		var email=data.email;
   		var sub_cat=data.subcategory;
      console.log(sub_cat);
   		var cat=data.category;
   		var type=data.type;
   		var attr=data.attributes;
      var name=data.name;
      var count=data.count;
      var color=data.color;
      var price=data.price;

      if(type=="rent"){
           var rentPeriod=data.rentPeriod;
      }
      else if (type=="sale"){
        var rentPeriod={"value":"no rent"};
      }
      if(!color){
          color='0';
      }
      if(!count){
        count=1;
      }



        Posting.create({email:email,type:type,CatPost:cat,subPost:sub_cat,attributesValue:attr,count:count,rentPeriod:rentPeriod,price:price,name:name,color:color})
      .then(function (inserted) {
        var post_id=inserted.id;
        console.log(post_id);

        req.file('files').upload({
          dirname: '../../assets/uploads',

        },function (err, files) {
          console.log(err);

          if (err) return res.serverError(err);
          console.log("G ka boom");
          console.log(files);
          console.log("file.length");
          console.log(files.length);
          var img={};
          var imgArr=[];
          for(var i=0;i< files.length;i++){
          var fileNameArray = files[i].fd.split("/");
          console.log("fileNameArray");
          console.log(fileNameArray);
          var fileName = fileNameArray[fileNameArray.length - 1];
          imgArr.push(fileName);
        }
        img[post_id]=imgArr;
        console.log(img);
          console.log("fileName: ",fileName);
          console.log(post_id);

          Posting.update({id:post_id},{'image1':img}).exec(function afterwards(err, updated){

            if (err) {
              return res.json({error:err});
            }


          console.log("inserted");
        console.log(inserted);
        return res.json({success: 1});
          });

      })
    }).catch(function(err){
      console.log(err);
          return res.json({status:false,error:err});
    });


  },

  postingsByCategory:function(req,res){
     var cat=req.param("category");
    Categories.find({id:cat}).populate('postings').exec(function (err,postings) {
      if(err){
        console.log(err);
       return res.json({status:false});
      }
      else{
        console.log("postings are");
        console.log(postings);
        return res.json({status:true,postings:postings});
      }




  });


  },
  search:function(req,res){
    var data=req.param("data");
    console.log(data);
    //var result=JSON.parse(data);
    //console.log(data.type);
    if((data.type=='All' || data.type=='all') && (data.category == 'All' || data.category == 'all') && data.keyword){
        Posting.find({or :[
          { like: { name: ''+data.keyword+'%' } }
        ]}).exec(function(err,result){
          if(err) {
            return res.json({status: false, data: err});
          }
          else{
            console.log("sucess");
            console.log(result);
            return res.json({status:true,data:result});
          }
        });
        //return res,json({status:false});
    }
    else if((data.type=='All' || data.type=='all') && (data.category != 'All' || data.category != 'all') && data.keyword){
      if(data.subcategory=='all' || data.subcategory=='All'){
        Categories.find({id:data.category}).populate('postings',{like:{name:''+data.keyword+'%'}}).exec(function(err,result){
          if(err) {
            return res.json({status: false, data: err});
          }
          else{
            console.log("sucess");
            console.log(result[0].postings);
            var postings={};
            for (var i=0; i<result.length; i++) {
              postings=(result[i].postings);
            }
            console.log(postings);
            return res.json({status:true,data:postings});
          }
        });
      }
      else{
        Subcategories.find({id:data.subcategory}).populate('postings',{like:{name:''+data.keyword+'%'}}).exec(function(err,result){
          if(err) {
            return res.json({status: false, data: err});
          }
          else{
            console.log("sucess");
            console.log(result[0].postings);
            var postings={};
            for (var i=0; i<result.length; i++) {
              postings=(result[i].postings);
            }
            console.log(postings);
            return res.json({status:true,data:postings});
          }
        });
      }
    }
    else if((data.type!='all' || data.type!='All') && (data.category == 'All' || data.category == 'all') && data.keyword){
      Posting.find({or :[
        { like: { name: ''+data.keyword+'%' },type:data.type }
      ]}).exec(function(err,result){
        if(err) {
          return res.json({status: false, data: err});
        }
        else{
          console.log("sucess");
          console.log(result);
          return res.json({status:true,data:result});
        }
      });
    }
    else if((data.type!='all' || data.type!='All') && (data.category != 'All' || data.category != 'all') && data.keyword){
      if(data.subcategory=='all' || data.subcategory=='All'){
        Categories.find({id:data.category}).populate('postings',{like:{name:''+data.keyword+'%'},type:data.type}).exec(function(err,result){
          if(err) {
            return res.json({status: false, data: err});
          }
          else{
            console.log("sucess");
            console.log(result[0].postings);
            var postings={};
            for (var i=0; i<result.length; i++) {
              postings=(result[i].postings);
            }
            console.log(postings);
            return res.json({status:true,data:postings});
          }
        });
      }
      else{
        Subcategories.find({id:data.subcategory}).populate('postings',{like:{name:''+data.keyword+'%'},type:data.type}).exec(function(err,result){
          if(err) {
            return res.json({status: false, data: err});
          }
          else{
            console.log("sucess");
            console.log(result[0].postings);
            var postings={};
            for (var i=0; i<result.length; i++) {
              postings=(result[i].postings);
            }
            console.log(postings);
            return res.json({status:true,data:postings});
          }
        });
      }
    }










  },
  postingsBySubCategory:function(req,res){
    var sub_cat=req.param("sub_cat");
    Subcategories.find({id:sub_cat}).populate('postings').exec(function (err,postings) {
      if(err){
        console.log(err);
       return res.json({status:false});
      }
      else{
        console.log("postings are");
        console.log(postings);
           return res.json({status:true,postings:postings});
      }




  });

  },
  postingsByPostId:function(req,res){
      var id =req.param("data");
      Posting.findOne({id:id}).then(function (post) {
        if(post){
          return res.json({status:true,postings:post})
        }
      }).catch(function (err) {
            console.log(err);
            return res.json({status: false});
        });
  },
  allPosts:function(req,res){
    console.log("allpost");
     Posting.find(function findAll(err, post) {
      if(!err) {
        console.log("All postings");
        return res.json({status:true,postings:post});
      }
      else{
        console.log("error");
        return res.json({status:false});
      }
    });
  },
  postingsByemail:function(req,res){
    var email=req.param("email");
    Posting.find({email:email}).then(function(posts){
      return res.json({status:true,postings:posts});

    }).catch(function(err){
          return res.json({status:false,error:err});
    });
  },
  postingsStatus:function(req,res){
        var data=req.param("data");
        var status=data.status;
        var post_id=data.post_id;
        if(post_id && status){
        Posting.update({id:post_id},{status:status}).exec(function afterwards(err, updated){

            if(err){
              return res.json({status:0,error:err});
            }
            else{
              return res.json({status:1});
            }


        });
      }
      else{
        return res.json({status:0,error:"empty data"});
      }

  },
  deletePost:function(req,res){
        var data=req.param("data");


        if(data){
        Posting.update({id:data},{delete:"1"}).exec(function afterwards(err, updated){

            if(err){
              return res.json({status:0,error:err});
            }
            else{
              return res.json({status:1});
            }


        });
      }
      else{
        return res.json({status:0,error:"empty data"});
      }

  },
  updatePost:function(req,res){
    var data=req.param("data");
    var attr=data.attribute;
    var name=data.name;
    var price=data.price;
    var type=data.type;
    var count=data.count;
    var post_id=data.post_id;
   var rent={"value":"no rent"};
    if(type=='rent'){
     rent=data.rentPeriod;
    }  
    Posting.update({id:post_id},{attributesValue:attr,name:name,price:price,count:count,name:name,type:type,rentPeriod:rent}).exec(function afterwards(err, updated){
      if(err){
        return res.json({status:0,error:err});
      }
      else{
        console.log(updated);
        return res.json({status:1,details:updated});
      }


    });
  }

};

