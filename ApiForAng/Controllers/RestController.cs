using Microsoft.AspNetCore.Mvc;
using System.Text.Json;

namespace ApiForAng.Controllers
{
    public class RestController : Controller
    {
        
        //Get item by id
        [HttpGet]
        [Route("rest/checklist/{id}")]
        public IActionResult Checklist(int id)
        {
            string content = JsonSerializer.Serialize<Item>(Items._items.FirstOrDefault(x=> x._id == id));
            return Content(content);
        }


        //Get all items
        [HttpGet]
        [ActionName("checklist")]
        public void Checklist()
        {
            Response.WriteAsJsonAsync<List<Item>>(Items._items);
        }


        //Create empty item
        [HttpPost]
        [ActionName("checklist")]
        public void CreateEmptyItem()
        {
            CreateItem(Items._items);
            Response.WriteAsJsonAsync<Item>(Items._items.LastOrDefault());
        }


        //Update item
        [HttpPut]
        [Route("rest/checklist/{id}")]
        public void UpdateItem(int id)
        {
            var body = Request.ReadFromJsonAsync<Item>().Result;
           
            Items._items.FirstOrDefault(x => x._id == id).isCompleted = body.isCompleted;
            Items._items.FirstOrDefault(x => x._id == id).title = body.title;
            Response.StatusCode = 200;

        }

        //Delete item
        [HttpDelete]
        [Route("rest/checklist/{id}")]
        public void DeleteItem(int id)
        {
            Items._items.Remove(Items._items.FirstOrDefault(x=> x._id == id));
            Response.StatusCode = 200;
        }


        
        void CreateItem(List<Item> items)
        {
            var itemId = items.Count;
            items.Add(new Item { _id = itemId });
        }
    }
}
////Створення пустого ітема
//app.MapPost("/rest/checklist", (HttpContext context, ApplicationContext appcontext) =>
//{
//    var responseResult = 0;
//    var message = string.Empty;
//    Stream stream = context.Request.Body;
//    StreamReader reader = new StreamReader(stream);
//    var body = reader.ReadToEndAsync().Result.ToString();
//    var splitBody = body.Split('"');
//    var token = splitBody[5];
//    User user = new User() { accessToken = token };
//    var userDb = appcontext.Users.FirstOrDefault(u => u.accessToken == user.accessToken);
//    if (userDb != null)
//    {
//        CreateItem(userDb, userItems);
//        //var a = itemContext.Items.GroupBy(u => u.UserId).LastOrDefault().Where(i=> i.UserId == userDb.Id);
//        context.Response.WriteAsJsonAsync<Item>(userItems.Last());
//        responseResult = 200;
//        message = "OK";
//    }
//    else
//    {
//        responseResult = 400;
//        message = "Token Error";
//    }
//});
////відправка всіх ітемів
//app.MapGet("rest/checklist", (HttpContext context) =>
//{
//    context.Response.WriteAsJsonAsync<List<Item>>(userItems);
//});
//app.MapPut("rest/checklist/{id}", (int id, HttpContext context, ApplicationContext application) =>
//{
//    var result = context.Request.ReadFromJsonAsync<Item>().Result;
//    userItems.FirstOrDefault(u => u._id == id).isCompleted = result.isCompleted;
//    userItems.FirstOrDefault(u => u._id == id).title = result.title;
//});