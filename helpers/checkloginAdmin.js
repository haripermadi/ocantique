function checkLoginAdmin(req,res,next){
  let isLogin = req.session.isLogin
  if(isLogin && req.session.type == 2){
    next()
  }else{
    let err = 'Admin only!!'
    res.render('admin/admin_login',{err:err})
  }

}
module.exports = {checkLoginAdmin}