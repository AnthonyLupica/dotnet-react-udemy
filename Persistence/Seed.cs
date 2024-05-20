using Journal = Domain.Journal;

namespace Persistence
{
    public class Seed
    {
        public static async Task SeedData(DataContext context)
        {
            // only seed data if we have no journals
            if (context.Journals.Any()) return;
            
            List<Journal> journals = new List<Journal>
            {
                new Journal
                {
                    Title = "Test Journal One",
                    Text = "I had a happy day!",
                    CreationDate = DateTime.UtcNow.AddMonths(-2),
                    EmotionPrimary = Domain.EmotionType.Joy,
                    EmotionColor = "#BDCB44",
                    EmotionScore = new Domain.EmotionScore
                    {
                        Joy = 0.26341459290497643,
                        Surprise = 0.047715350901946396,
                        Disgust = 0,
                        Sadness = 0,
                        Anger = 0,
                        Fear = 0
                    }
                    
                },
                new Journal
                {
                    Title = "Test Journal Two",
                    Text = "I had a sad day :(",
                    CreationDate = DateTime.UtcNow.AddMonths(3),
                    EmotionPrimary = Domain.EmotionType.Sadness,
                    EmotionColor = "#209FF1",
                    EmotionScore = new Domain.EmotionScore
                    {
                        Joy = 0,
                        Surprise = 0,
                        Disgust = 0.047715350901946396,
                        Sadness = 0.26341459290497643,
                        Anger = 0,
                        Fear = 0
                    }
                },
            };

            await context.Journals.AddRangeAsync(journals);
            await context.SaveChangesAsync();
        }
    }
}
