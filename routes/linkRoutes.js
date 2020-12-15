const express = require('express');
const router = express.Router();
var methodOverride = require('method-override')
router.use(methodOverride('_method'));

const LinkModel = require('../models/Link');
const linkController = require('../controller/linkController');
const { urlencoded } = require('express');


router.get('/',linkController.allLinks)
router.get('/:title', linkController.redirect)
router.get('/add',(req,res)=>{res.render('add',{error:false ,body:{}})})
router.get('/edit/:id', linkController.loadLink)

router.post('/',express.urlencoded({extended:true}), linkController.addLink);
router.post('/edit/:id',urlencoded({extended:true}), linkController.editLink);

router.delete('/:id', linkController.deleteLink)
router.delete('/', express.urlencoded({extended:true}) ,linkController.deleteLink)

module.exports = router;
