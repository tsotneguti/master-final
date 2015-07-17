package ge.combal.alan.arena.repository;

import ge.combal.alan.arena.domain.Test;
import org.springframework.data.repository.Repository;

/**
 * Created by nati on 03.07.2015.
 */
public interface TestRepository extends Repository<Test, String> {
    Test save(Test test);
}
