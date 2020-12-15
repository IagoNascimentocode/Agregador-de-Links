const LinkModel = require('../models/Link');


const redirect = async(req,res,next)=>{
        /*    -- params recebe o input via url  */
        let title = req.params.title
        try{
            let doc = await LinkModel.findOneAndUpdate({ title }, {$inc:{clicks:1}})
            console.log(doc)
            if(doc){
                res.redirect(doc.url)

            }else{
                next()
            }
        }catch(error){
            res.send(error);
        }
        
}
const addLink = async (req,res)=>{
    let link = new LinkModel(req.body);

    try{
        let doc = await link.save();
        res.redirect('/')
    }catch(error){
        res.render('add', {error, body:req.body })

    }
}
const allLinks = async (req,res)=>{
    try{
        let docs = await LinkModel.find({});
        res.render('all', { links:docs })
    }catch(error){
        res.send(error)
    }
}
const deleteLink = async (req,res) => {
    let id = req.params.id;
    if(!id){
        id = req.body.id;
    }
    try{
        await LinkModel.findByIdAndDelete(id)
        //res.send(id)
        res.redirect('/')

    }catch(error){
        res.status(404).send(error);
    }
}
const loadLink = async (req,res) => {
    let id = req.params.id;

    try{
        let doc = await LinkModel.findById(id)
        //res.send(id)
        res.render('edit',{error:false,body:doc})

    }catch(error){
        res.status(404).send(error);
    }
}
    const editLink = async (req,res)=>{
        let link = {}
        link.title = req.body.title;
        link.description = req.body.description;
        link.url = req.body.url;

        let id = req.params.id;
        if(!id){
            id = req.body.id;
        }
        
        try{
            let doc = await LinkModel.updateOne({_id:id},link);
            res.redirect('/')
        }catch(error){
            res.render('edit', {error, body:req.body })
            
        }
    }


module.exports = {redirect,addLink,allLinks,deleteLink,loadLink,editLink}