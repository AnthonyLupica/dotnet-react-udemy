namespace Domain
{
    /// <summary>
    /// a journal entry, and its associated emotion/color/score
    /// </summary>
    public class Journal
    {
        public Guid Id { get; set; }

        public string Title { get; set; }

        public string Text { get; set; }

        public DateTime CreationDate { get; set; }

        public EmotionType EmotionPrimary { get; set; }

        public string EmotionColor { get; set; }

        public EmotionScore EmotionScore { get; set; }
    }
}
