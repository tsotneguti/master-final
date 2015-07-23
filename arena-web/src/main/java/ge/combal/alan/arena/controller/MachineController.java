package ge.combal.alan.arena.controller;

import ge.combal.alan.arena.domain.Test;
import ge.combal.alan.arena.repository.TestRepository;
import ge.combal.alan.arena.service.api.MachineService;
import ge.combal.alan.turing.Code;
import ge.combal.alan.turing.Result;
import ge.combal.alan.turing.tape.DequeTape;
import org.springframework.beans.factory.annotation.Autowired;
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

    @RequestMapping(value = "eval", method = RequestMethod.POST)
    public HashMap<Integer, Boolean> eval(@RequestBody Code code, HttpServletRequest request) {

        Test test = testRepository.findByProblemId(code.getProblemId());

        HashMap<Integer, Boolean> result = new HashMap<>();

        for (int i = 0; i < test.getTests().size(); i++) {
            DequeTape tape = new DequeTape(test.getTests().get(i).getIn());
            String res = service.eval(code, tape).getResult();
            String out = test.getTests().get(i).getOut().toString().substring(1, test.getTests().get(i).getOut().toString().length() - 1);
            if (res.equals(out)) {
                result.put(i, true);
            } else {
                result.put(i, false);
            }
        }

        return result;
    }
}