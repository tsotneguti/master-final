package ge.combal.alan.arena.controller;

import ge.combal.alan.arena.domain.Problem;
import ge.combal.alan.arena.domain.Test;
import ge.combal.alan.arena.domain.User;
import ge.combal.alan.arena.repository.ProblemRepository;
import ge.combal.alan.arena.repository.TestRepository;
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
    TestRepository repository;

    @Autowired
    ProblemRepository problemRepository;

    @RequestMapping("test")
    public Test test(String name) {
        return repository.save(new Test(name));
    }


    @RequestMapping("/")
    public void alan(HttpServletResponse response) throws IOException {
        response.sendRedirect("./login");
    }

    @RequestMapping(value = "/problems")
    public List<Problem> getProblems(
            @RequestBody(required = false) String problemId
//            @PathVariable  String problemId
    ) {
        if (problemId == null)
            return problemRepository.findAll();
        return problemRepository.findByProblemId(problemId);
    }

//    @RequestMapping(value = "login", method = RequestMethod.GET)
//    public ModelAndView login(
//            @RequestParam(value = "error", required = false) String error,
//            @RequestParam(value = "logout", required = false) String logout) {
//5
//        ModelAndView model = new ModelAndView();
//        if (error != null) {
//            model.addObject("error", "Invalid username and password!");
//        }
//
//        if (logout != null) {
//            model.addObject("msg", "You've been logged out successfully.");
//        }
//        model.setViewName("login");
//
//        return model;
//
//    }

}
