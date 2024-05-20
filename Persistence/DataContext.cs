using Domain;
using Microsoft.EntityFrameworkCore;

namespace Persistence
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions options) : base(options) {}

        public DbSet<Activity> Activities { get; set; }

        public DbSet<Journal> Journals { get; set; }

        public DbSet<EmotionScore> EmotionScores { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Journal>()
                .HasOne(j => j.EmotionScore)
                .WithOne(e => e.Journal)
                .HasForeignKey<EmotionScore>(c => c.FkJournal);
        }
    }
}
