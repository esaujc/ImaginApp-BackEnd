const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const User = require('../models/user');
const Speech = require('../models/speech');
const session = require('express-session');
const { isLoggedIn } = require('../helpers/middlewares');

const ObjectId = mongoose.Types.ObjectId;

router.get('/:id', (req, res, next) => {
   const id = req.params.id;
 

  Speech.findById(id, (err, speech) => {
    if (err) {
      next(err);
    } else {
      res.status(200).json(speech)
    }
  });
    
});

// router.get('/profile/myspeeches', (req, res, next) => {
  
//   Speech.find({}, (err, speechList) => {
//     if (err) {
//       next(err);
//     } else {
//       res.status(200).json(speechList)
//     }
//   });
// });


router.get('/', (req, res, next) => {
console.log(req.query);
  
 
  
  Speech.find(req.query, (err, speechList) => {
    if (err) {
      next(err);
    } else {
      res.status(200).json(speechList)
    }
  });

  // Speech.find({is_Public: true}, (err, speechList) => {
  //   if (err) {
  //     next(err);
  //   } else {
  //     res.status(200).json(speechList)
  //   }
  // });


  // Speech.find({}, (err, speechList) => {
  //   if (err) {
  //     next(err);
  //   } else {
  //     res.status(200).json(speechList)
  //   }
  // });
    
});

router.post('/', (req, res, next) => {
  // const userId = req.session.currentUser._id;

  // console.log('entra');
  // console.log(req.query);

  // const owner = ObjectId("5be42047b88f1e220904717a");
  const newSpeech = new Speech({
    // owner,
    title: req.body.title,
    message: req.body.message,
    tag: req.body.tag,
    owner: req.body.owner,
    is_Public: req.body.is_Public,
  });

  
//
  // let tagsplit = req.body.tag.split('');
  // tagsplit.map(tag => {
  //   return  newSpeech.tag.push(tag);
  // })
  
// title: String,
//   message: String,
//   tag: [{type: String}],
//   private: Boolean,
  
  newSpeech.save((err) => {
    if(err){
        next(err);
    }else{
      res.status(200).json({ newSpeech });
    }
  })
    // .then((createdSpeech) => {
    //   console.log(' error al introducir');
    //   res.status(200).json({speech});
    // })
    // .catch((error) => {
    //   console.log(' error de add');
    // });

});

router.put('/:id', (req,res,next) => {
  const id = req.params.id;

  let addTag = []
  addTag.push(req.body.tag);

  const updateSpeech = {
    title: req.body.title,
    message: req.body.message,
    tag: req.body.tag,
    is_Public: req.body.is_Public,
  }

  Speech.findByIdAndUpdate(id, updateSpeech, (err) => {
    if (err){
      next(err);
    }else{
        res.status(200).json({message: 'Updated'});
    }
  })
})


module.exports = router;