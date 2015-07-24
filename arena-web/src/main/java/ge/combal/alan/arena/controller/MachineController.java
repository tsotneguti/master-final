package ge.combal.alan.arena.controller;

import ge.combal.alan.arena.domain.Test;
import ge.combal.alan.arena.domain.User;
import ge.combal.alan.arena.repository.TestRepository;
import ge.combal.alan.arena.repository.UserRepository;
import ge.combal.alan.arena.security.SecurityUser;
import ge.combal.alan.arena.service.api.MachineService;
import ge.combal.alan.turing.Code;
import ge.combal.alan.turing.Result;
import ge.combal.alan.turing.tape.DequeTape;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.util.HashMap;
import java.util.Map;

/**
 * Created by tsotne on 6/30/15.
 */
@RestController
@RequestMapping("machine")
public class MachineController {

    @Autowired
    MachineService service;

    @Autowired
    TestRepository testRepository;

    @Autowired
    UserRepository userRepository;

    @RequestMapping(value = "eval", method = RequestMethod.POST)
    public HashMap<Integer, Boolean> eval(@RequestBody Code code, HttpServletRequest request) {

        Test test = testRepository.findByProblemId(code.getProblemId());

        HashMap<Integer, Boolean> result = new HashMap<>();

        Integer corrects = 0;

        for (int i = 0; i < test.getTests().size(); i++) {
            DequeTape tape = new DequeTape(test.getTests().get(i).getIn());
            System.out.println(test.getTests().get(i).getIn());
            String res = service.eval(code, tape).getResult();
            String out = test.getTests().get(i).getOut().toString().substring(1, test.getTests().get(i).getOut().toString().length() - 1);
            System.out.println(res.trim());
            System.out.println(out.trim());
            if (res.trim().equals(out.trim())) {
                corrects++;
                result.put(i, true);
            } else {
                result.put(i, false);
            }
        }

        SecurityUser suser = (SecurityUser) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        User user = userRepository.findByUsername(suser.getUsername());

        Double newPoints = corrects * 100.0 / test.getTests().size() ;

        for (int i = 0; i < user.getPoints().size(); i++) {
            if (code.getProblemId() == user.getPoints().get(i).getProblemId()){
                if(user.getPoints().get(i).getPoints() < newPoints) user.getPoints().get(i).setPoints(newPoints);
                break;
            }
        }
        userRepository.save(user);

        return result;
    }
}