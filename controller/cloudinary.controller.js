var cloudinaryModel=require('./../model/cloudinary.model.js');

var pictures= function(req,res){
	cloudinaryModel.getPictures(req.params.itemId).then((result)=>{
		res.send(result);
	},(error)=>{
		res.status(400).send(error);
	})

}

module.exports={
	pictures
}