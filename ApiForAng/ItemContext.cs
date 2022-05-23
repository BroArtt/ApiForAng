using Microsoft.EntityFrameworkCore;

namespace ApiForAng
{
    public class ItemContext:DbContext 
    {
        public DbSet<Item> Items { get; set; } = null!;
        //public ItemContext(DbContextOptions<ApplicationContext> options)
        //    : base(options)
        //{
        //    Database.EnsureCreated();
        //    // создаем базу данных при первом обращении
        //}
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Item>().HasData(
                    new Item { Id = 1, UserId = 1, title = "sad", isCompleted = false, Time = DateTime.Now },
                    new Item { Id = 2, UserId = 5, title = "asdsad", isCompleted = true, Time = DateTime.Now },
                   new Item { Id = 3, UserId = 3, title = "saasdasdd", isCompleted = false, Time = DateTime.Now }
            );
        }
    }
}
