using Microsoft.EntityFrameworkCore;

namespace ApiForAng
{
    public class ApplicationContext:DbContext
    {
        public DbSet<User> Users { get; set; } = null!;
            public ApplicationContext(DbContextOptions<ApplicationContext> options)
                : base(options)
            {
            Database.EnsureCreated();
            // создаем базу данных при первом обращении
            }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<User>().HasData(
                    new User { Id = 1, FullName = "Tom", Password = "37" },
                    new User { Id = 2, FullName = "Bob", Password = "37" },
                    new User { Id = 3, FullName = "Sam", Password = "37" }
            );
        }
    }
}
