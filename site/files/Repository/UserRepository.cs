using System.Collections.Generic;
using Site.Config;
using Site.Models;

namespace Site.Repository
{
  public class UserRepository : BaseRepository<User>
  {
    public UserRepository(AppConfig config) : base(config) { }

    public User FindByEmail(string email) => FirstOrDefault($"SELECT * FROM USER WHERE EMAIL = {email}");

    public User GetById(int id) => FirstOrDefault($"SELECT * FROM USER WHERE Id = @Id", new { Id = id });

    public IEnumerable<User> GetAll() => Query("SELECT * FROM USER");
  }
}