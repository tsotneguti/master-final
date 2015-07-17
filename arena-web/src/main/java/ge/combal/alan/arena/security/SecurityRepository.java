package ge.combal.alan.arena.security;

import ge.combal.alan.arena.domain.User;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.data.repository.Repository;

public interface SecurityRepository extends Repository<User, String> {
    @Query(value = "{ 'username' : ?0 }", fields = "{ 'username' : 1, 'password' : 1, 'roles' : 1}")
    User findByUsername(String username);
}
