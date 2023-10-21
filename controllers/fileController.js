const File=require('../modals/myModal');
const csv = require('csv-parser')
const fs = require('fs');
const path=require('path');

// home page
module.exports.home=async function(req,res){
    try{
        let files = await File.find({});
        res.render('home',{
            file:files,
        });
    }catch(err){
        console.log('error in home',err)
    }
}

module.exports.create = function(req,res){
    try{
        File.uploadedFile(req,res, function(err){
            if(err){
                return res.redirect('back');
            }
            if(
                (req.file && req.file.mimetype == 'application/vnd.ms-excel') ||
                (req.file && req.file.mimetype == "text/csv") 
            ){
                File.create({
                    filePath:req.file.path,
                    originalName:req.file.originalname,
                    file:req.file.filename
                })
                .then(function(data){
                    if(!data){
                        console.log('error in if create',data);
                        return res.status(400).json({
                            message:'error in creating file'
                        });
                    }
                    return res.redirect('/')
                })
            }else{
                return res.redirect('/')
            }
        })
    }
    catch(err){
        console.log('error in uploading file',err);
        return;
    }
}

module.exports.delete = async function(req, res){
    try{
        const filename = req.params.file;
        
        let isFile = await File.findOne({file: filename});
        if(isFile){
            await File.deleteOne({file: filename});
            
            return res.redirect("/");
        }else{
            console.log("file not found");
            return res.redirect("/");
        }
    }catch(err){
        console.log(err);
        return res.statu(500).json({
            message: "Internal Server Error"
        });
    }
}

module.exports.view=async function(req,res){
    let filePaths=await File.findOne({file: req.params.file});
    const results=[];
    const header=[];
    fs.createReadStream(filePaths.filePath)
      .pipe(csv())
      .on('headers', (headers) => {
            headers.map((head)=>{
                header.push(head);
            })
        })
        .on('data', (data) =>
        results.push(data))
        .on('end', () => {
            res.render('filedata',{
                title: filePaths.originalName,
                head:header,
                data:results,
                length:results.length
            })
      });
}
