package ge.combal.alan.arena.repository;

import ge.combal.alan.arena.domain.User;
import org.springframework.data.repository.Repository;

/**
 * Created by nati on 03.07.2015.
 */
public interface UserRepository extends Repository<User, String > {
    User save(User user);
    User findByUsername(String username);
}
