package ge.combal.alan.arena.repository;

import ge.combal.alan.arena.domain.Problem;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.repository.Repository;

import java.util.List;

/**
 * Created by tsotne on 7/12/15.
 */
public interface ProblemRepository extends Repository<Problem, String> {
    List<Problem> findByProblemId(String problemId);
    List<Problem> findAll();
}
