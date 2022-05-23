using System.IdentityModel.Tokens.Jwt;
using System.Text;
using ApiForAng;
using IdentityModel;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;


var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
//builder.Services.AddEndpointsApiExplorer();
//builder.Services.AddSwaggerGen();
//builder.Services.NewtonsoftJson();
//string connection = C
string connection = builder.Configuration.GetConnectionString("DefaultConnection");
builder.Services.AddDbContext<ApplicationContext>(options => options.UseSqlServer(connection));
//builder.Services.AddDbContext<ItemContext>(options => options.UseSqlServer(connection));
builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(options =>
    {
        options.RequireHttpsMetadata = false;
        options.TokenValidationParameters = new TokenValidationParameters
        {
            // укзывает, будет ли валидироваться издатель при валидации токена
            ValidateIssuer = true,
            // строка, представляющая издателя
            ValidIssuer = AuthOptions.ISSUER,

            // будет ли валидироваться потребитель токена
            ValidateAudience = true,
            // установка потребителя токена
            ValidAudience = AuthOptions.AUDIENCE,
            // будет ли валидироваться время существования
            ValidateLifetime = true,

            // установка ключа безопасности
            IssuerSigningKey = AuthOptions.GetSymmetricSecurityKey(),
            // валидация ключа безопасности
            ValidateIssuerSigningKey = true,
        };
    });
var app = builder.Build();

// Configure the HTTP request pipeline.
//if (app.Environment.IsDevelopment())
//{
//   app.UseSwagger();.AddNewtonsoftJson();
// app.UseSwaggerUI();
//}
Items items = new Items { };

List<Item> userItems = new List<Item> { };

app.UseStaticFiles();
var usersFilePath = "users/";
var tokensFilePath = "Tokens/";
app.MapGet("/", async (HttpContext context) =>
{
    var content = await File.ReadAllTextAsync("wwwroot/index.html");

    await context.Response.WriteAsync(content);
    
});
//Створення пустого таска
app.MapPost("/rest/checklist", (HttpContext context, ApplicationContext appcontext)=>
{
    var responseResult = 0;
    var message = string.Empty;
    Stream stream = context.Request.Body;
    StreamReader reader = new StreamReader(stream);
    var body = reader.ReadToEndAsync().Result.ToString();
    var splitBody = body.Split('"');
    var token = splitBody[5];
    User user = new User() { accessToken = token};
    var userDb = appcontext.Users.FirstOrDefault(u => u.accessToken == user.accessToken);
    if (userDb != null)
    {
        CreateItem(userDb, userItems);
        //var a = itemContext.Items.GroupBy(u => u.UserId).LastOrDefault().Where(i=> i.UserId == userDb.Id);
        context.Response.WriteAsJsonAsync<Item>(userItems.Last());
        responseResult = 200;
        message = "OK";
    }
    else
    {
        responseResult = 400;
        message = "Token Error";
    }
    //context.Response.StatusCode = responseResult;
    //context.Response.Headers.GrpcMessage = message;
});
app.MapGet("rest/checklist", (HttpContext context, ApplicationContext appcontext) =>
{
    context.Response.WriteAsJsonAsync<List<Item>>(userItems);
});

app.MapGet("/auth/refresh", (HttpContext context) =>
{

});

//app.MapPost("/auth/sign-out", (HttpContext context) =>
//{
    
//});
//Регистриция
app.MapPost("/auth/sign-up", (HttpContext context, ApplicationContext apcontext) =>
 {
    var userJson = context.Request.ReadFromJsonAsync<User>();
    var responseResult = 0;
    var message = string.Empty;
     User user = new User() {Email = userJson.Result.Email, FullName = userJson.Result.FullName, Password = userJson.Result.Password,
         Role = userJson.Result.Role};


    if (Registartion(user, apcontext)) 
    {
        responseResult = 200;
        message = "reg OK";
    }
    else {
        responseResult = 400;
        message = "reg ERROR";
         }
    context.Response.StatusCode = responseResult;
    context.Response.Headers.GrpcMessage = message;
});
//Аутентификация
app.MapPost("/auth/sign-in", (HttpContext context, ApplicationContext apcontext) =>
{
    var userJson = context.Request.ReadFromJsonAsync<User>();
    User user = new User()
    {
        Email = userJson.Result.Email,
        FullName = userJson.Result.FullName,
        Password = userJson.Result.Password,
        Role = userJson.Result.Role
    };
    
   var result = userJson.Result;
   var responseResult = 0;
   var message = string.Empty;
   var accessToken = string.Empty;
   var refreshToken = string.Empty;

    if (LogIn(user, apcontext))
    {
        User dbUser = apcontext.Users.FirstOrDefault(u => u.Email == user.Email);
        refreshToken = getRefreshToken();
        accessToken = getAccesToken();
        dbUser.refreshToken = refreshToken;
        dbUser.accessToken = accessToken;
        apcontext.Users.Update(dbUser);
        apcontext.SaveChanges();
        responseResult = 200;
        message = "Login Ok";
    }
    else
    {
        responseResult = 400;
        message = "Login Error";
    }
    context.Response.StatusCode = responseResult;
    context.Response.Headers.GrpcMessage = message;
    if (refreshToken != "" && accessToken != "")
    {
        Tokens tokens = new Tokens() { refreshToken = refreshToken, accessToken = accessToken };
        context.Response.WriteAsJsonAsync<Tokens>(tokens);
    }
});

app.Run();




  bool Registartion(User user, ApplicationContext context)
{
    var ExistUser = context.Users.FirstOrDefault(u => u.Email == user.Email);
    if ((ExistUser == null) && ( ( user.Email != "" ) && ( user.Password != "" ) ))
    {
        context.Users.Add(user);
        context.SaveChanges();
        return true;
    }
    else
        return false;
    
}
 bool LogIn(User user, ApplicationContext context)
{
    var userExist = context.Users.FirstOrDefault(u => u.Email == user.Email);
    if (userExist != null) { 
        if (CheckPass(user, context))
        {
            return true;
        }
        else
            return false;
    }
    else
        return false;
}
string getAccesToken() {
    var Time = 1;//Minutes
    return getJWTToken(Time);
}
string getRefreshToken() {
    var Time = 1440;//Minutes
    return getJWTToken(Time);
}
string getJWTToken(int Time) 
{
    var now = DateTime.UtcNow;
    // создаем JWT-токен
    var jwt = new JwtSecurityToken(
            issuer: AuthOptions.ISSUER,
            audience: AuthOptions.AUDIENCE,
            notBefore: now,
            //claims: identity.Claims,
            expires: now.Add(TimeSpan.FromMinutes(Time)),
            signingCredentials: new SigningCredentials(AuthOptions.GetSymmetricSecurityKey(), SecurityAlgorithms.HmacSha256));
    var encodedJwt = new JwtSecurityTokenHandler().WriteToken(jwt);
    return encodedJwt.ToString();
}
bool CheckPass(User user, ApplicationContext context) 
{
    if (context.Users.FirstOrDefault(u => u.Password == user.Password)!= null) 
    {
        return true;
    }
    else
    {
        return false;
    }
}
void CreateItem(User user, List<Item> items)
{
    var itemId = userItems.Count;
    items.Add(new Item {Id = itemId });
    //itemContext.Items.Add(new Item() {UserId = user.Id});
}
//struct authToken{ string x-auth-token; };