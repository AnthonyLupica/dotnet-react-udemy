namespace Domain
{
    /// <summary>
    /// [0, 1] score breakdown of each emotion in relation to a journal
    /// </summary>
    public class EmotionScore
    {
        public int Id { get; set; }

        public Guid FkJournal { get; set; }
        
        public double Joy { get; set; }

        public double Surprise { get; set; }

        public double Disgust { get; set; }

        public double Sadness { get; set; }

        public double Anger { get; set; }

        public double Fear { get; set; }

        public Journal Journal { get; set; }
    }
}
