function checkLogin(req,res,next){
  let isLogin = req.session.isLogin
  if(isLogin){
    console.log('session user=========')
    next()
  }else{
    let err = 'Please log in first!'
    // res.send(err)
    res.render('users/login',{err:err})
  }

}
module.exports = {checkLogin}