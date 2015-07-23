package ge.combal.alan.arena.controller;

import ge.combal.alan.arena.domain.Problem;
import ge.combal.alan.arena.domain.Test;
import ge.combal.alan.arena.domain.User;
import ge.combal.alan.arena.repository.ProblemRepository;
import ge.combal.alan.arena.repository.UserRepository;
import ge.combal.alan.arena.security.SecurityUser;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.security.Principal;
import java.util.List;

@RestController
@RequestMapping("alan")
public class MainController {

    @Autowired
    UserRepository userRepository;

    @RequestMapping("get-user")
    public User user(Principal principal) {
        SecurityUser user = (SecurityUser) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        return userRepository.findByUsername(user.getUsername());
    }

    @Autowired
    ProblemRepository problemRepository;

    @RequestMapping(value = "/problems")
    public List<Problem> getProblems(
            @RequestBody(required = false) String problemId) {
        if (problemId == null)
            return problemRepository.findAll();
        return problemRepository.findByProblemId(problemId);
    }
}
