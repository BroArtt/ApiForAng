﻿namespace ApiForAng
{
    public class User
    {
        public int Id { get; set; }
        public string Email { get; set; } = string.Empty;
        public string FullName { get; set; } = string.Empty;
        public string Password { get; set; } = string.Empty;
        public string Role { get; set; } = string.Empty ;
        public string refreshToken { get; set; } = string.Empty;
        public string accessToken { get; set; } = string.Empty;
    }
}
