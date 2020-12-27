const express =require('express')
const router = express.Router(); // router function of the express 


router.get('/', (req,res) => {
  res.render('index')
})


module.exports = router