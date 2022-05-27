using Microsoft.AspNetCore.Mvc;

namespace ApiForAng.Controllers
{
    public class AuthController : Controller
    {
        //public IActionResult Index()
        //{
        //    return View();
        //}
        //[HttpPost]
        //[ActionName("sign-up")]
        //public IActionResult Registaration()
        //{
        //    return Content("asd");
        //}

    }
}
    //bool Registartion(User user, ApplicationContext context)
    //{
    //    var ExistUser = context.Users.FirstOrDefault(u => u.Email == user.Email);
    //    if ((ExistUser == null) && ((user.Email != "") && (user.Password != "")))
    //    {
    //        context.Users.Add(user);
    //        context.SaveChanges();
    //        return true;
    //    }
    //    else
    //        return false;

    //}
    //bool LogIn(User user, ApplicationContext context)
    //{
    //    var userExist = context.Users.FirstOrDefault(u => u.Email == user.Email);
    //    if (userExist != null)
    //    {
    //        if (CheckPass(user, context))
    //        {
    //            return true;
    //        }
    //        else
    //            return false;
    //    }
    //    else
    //        return false;
    //}
    //string getAccesToken()
    //{
    //    var Time = 1;//Minutes
    //    return getJWTToken(Time);
    //}
    //string getRefreshToken()
    //{
    //    var Time = 1440;//Minutes
    //    return getJWTToken(Time);
    //}
    //string getJWTToken(int Time)
    //{
    //    var now = DateTime.UtcNow;
    //    // создаем JWT-токен
    //    var jwt = new JwtSecurityToken(
    //            issuer: AuthOptions.ISSUER,
    //            audience: AuthOptions.AUDIENCE,
    //            notBefore: now,
    //            //claims: identity.Claims,
    //            expires: now.Add(TimeSpan.FromMinutes(Time)),
    //            signingCredentials: new SigningCredentials(AuthOptions.GetSymmetricSecurityKey(), SecurityAlgorithms.HmacSha256));
    //    var encodedJwt = new JwtSecurityTokenHandler().WriteToken(jwt);
    //    return encodedJwt.ToString();
    //}
//    bool CheckPass(User user, ApplicationContext context)
//    {
//        if (context.Users.FirstOrDefault(u => u.Password == user.Password) != null)
//        {
//            return true;
//        }
//        else
//        {
//            return false;
//        }
//    }
//}
