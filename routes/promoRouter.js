const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const Promotions = require('../models/promotions');

const promoRouter = express.Router();
promoRouter.use(bodyParser.json());
promoRouter.route('/')
.get((req,res,next)=>{
    Promotions.find({})
    .then((promo)=>{
        res.statusCode = 200;
        res.setHeader('Content-Type','application/json');
        res.json(promo);
    },(err)=> next(err))
    .catch((err)=> next(err));
})
.post((req,res,next)=>{
    Promotions.create(req.body)
    .then((promo)=>{
        console.log('Promotion created ',promo);
        res.statusCode = 200;
        res.setHeader('Content-Type','application/json');
        res.json(promo);
    },(err)=> next(err))
    .catch((err)=> next(err))
})
.put((req,res,next)=>{
    res.statusCode = 403;
    res.end('Put Operation Not Supported on Promotions');
})
.delete((req,res,next)=>{
    Promotions.remove({})
    .then((resp)=>{
        res.statusCode = 200;
        res.setHeader('Content-Type','application/json');
        res.json(resp);
    },(err)=> next(err))
    .catch((err)=> next(err))
});
promoRouter.route('/:promoId')
.get((req,res,next)=>{
   Dishes.findById(req.params.promoId)
   .then((promo)=>{
    console.log('Promotion created ',promo);
    res.statusCode = 200;
    res.setHeader('Content-Type','application/json');
    res.json(promo);
    },(err)=> next(err))
    .catch((err)=> next(err))
})
.post((req,res,next)=>{
    res.statusCode = 403;
    res.end('POST operation does not Supported on \Promotions'+ req.params.promoId);
})
.put((req,res,next)=>{
    Promotions.findByIdAndUpdate(req.params.promoId,
        {$set: req.body},
        { new: true})
        .then((promo)=>{
            console.log('Promotion Updated ',promo);
            res.statusCode = 200;
            res.setHeader('Content-Type','application/json');
            res.json(promo);
        },(err)=> next(err))
        .catch((err)=> next(err))
})
.delete((req,res,next)=>{
    Promotions.findByIdAndRemove(req.params.promoId)
    .then((resp)=>{
        res.statusCode = 200;
        res.setHeader('Content-Type','application/json');
        res.json(resp);
    },(err)=> next(err))
    .catch((err)=> next(err))
});


module.exports = promoRouter;