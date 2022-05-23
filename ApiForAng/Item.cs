namespace ApiForAng
{
    public class Item
    {
        public int _id { get; set; }
        public bool isCompleted { get; set; } = false;
        public int UserId { get; set; }
        public string title { get; set; } = string.Empty;
        public DateTime Time { get; set; } = DateTime.Now;
    }
}
