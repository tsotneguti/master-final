package ge.combal.alan.arena.controller;

import ge.combal.alan.arena.service.api.MachineService;
import ge.combal.alan.turing.Code;
import ge.combal.alan.turing.Result;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;

/**
 * Created by tsotne on 6/30/15.
 */
@RestController
@RequestMapping("machine")
public class MachineController {

    @Autowired
    MachineService service;

    @RequestMapping(value = "eval", method = RequestMethod.POST)
    public Result eval(@RequestBody Code code, HttpServletRequest request) {

        return service.eval(code);
    }
}