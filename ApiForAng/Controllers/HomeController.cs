using Microsoft.AspNetCore.Mvc;

namespace ApiForAng.Controllers
{
    public class HomeController : Controller
    {
        [HttpGet]
        public IActionResult Index()
        {
            return View();
        }  

            //});
            
            //// видача нового токена
            //app.MapGet("/auth/refresh", (HttpContext context) =>
            //{

            //});
            ////
            //app.MapPut("rest/checklist/{id}", (int id, HttpContext context, ApplicationContext application) =>
            //{
            //    var result = context.Request.ReadFromJsonAsync<Item>().Result;
            //    userItems.FirstOrDefault(u => u._id == id).isCompleted = result.isCompleted;
            //    userItems.FirstOrDefault(u => u._id == id).title = result.title;
            //});
            ////збереження змін
            //app.MapDelete("rest/checklist/{id}", (int id, HttpContext context, ApplicationContext application) =>
            //{
            //    var item = userItems.FirstOrDefault(u => u._id == id);
            //    userItems.Remove(item);
            //    context.Response.StatusCode = 200;
            //});
            ////Реєстрація
            //app.MapPost("/auth/sign-up", (HttpContext context, ApplicationContext apcontext) =>
            //{
            //    var userJson = context.Request.ReadFromJsonAsync<User>();
            //    var responseResult = 0;
            //    var message = string.Empty;
            //    User user = new User()
            //    {
            //        Email = userJson.Result.Email,
            //        FullName = userJson.Result.FullName,
            //        Password = userJson.Result.Password,
            //        Role = userJson.Result.Role
            //    };


            //    if (Registartion(user, apcontext))
            //    {
            //        responseResult = 200;
            //        message = "reg OK";
            //    }
            //    else
            //    {
            //        responseResult = 400;
            //        message = "reg ERROR";
            //    }
            //    context.Response.StatusCode = responseResult;
            //    context.Response.Headers.GrpcMessage = message;
            //});
            ////Аутентифікация
            //app.MapPost("/auth/sign-in", (HttpContext context, ApplicationContext apcontext) =>
            //{
            //    var userJson = context.Request.ReadFromJsonAsync<User>();
            //    User user = new User()
            //    {
            //        Email = userJson.Result.Email,
            //        FullName = userJson.Result.FullName,
            //        Password = userJson.Result.Password,
            //        Role = userJson.Result.Role
            //    };

            //    var result = userJson.Result;
            //    var responseResult = 0;
            //    var message = string.Empty;
            //    var accessToken = string.Empty;
            //    var refreshToken = string.Empty;

            //    if (LogIn(user, apcontext))
            //    {
            //        User dbUser = apcontext.Users.FirstOrDefault(u => u.Email == user.Email);
            //        refreshToken = getRefreshToken();
            //        accessToken = getAccesToken();
            //        dbUser.refreshToken = refreshToken;
            //        dbUser.accessToken = accessToken;
            //        apcontext.Users.Update(dbUser);
            //        apcontext.SaveChanges();
            //        responseResult = 200;
            //        message = "Login Ok";
            //    }
            //    else
            //    {
            //        responseResult = 400;
            //        message = "Login Error";
            //    }
            //    context.Response.StatusCode = responseResult;
            //    context.Response.Headers.GrpcMessage = message;
            //    if (refreshToken != "" && accessToken != "")
            //    {
            //        Tokens tokens = new Tokens() { refreshToken = refreshToken, accessToken = accessToken };
            //        context.Response.WriteAsJsonAsync<Tokens>(tokens);
            //    }
            //});
        }
    }

