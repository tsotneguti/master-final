package ge.combal.alan.arena.service.impl;

import ge.combal.alan.arena.service.api.MachineService;
import ge.combal.alan.turing.Code;
import ge.combal.alan.turing.Result;
import ge.combal.alan.turing.TuringMachine;
import org.springframework.stereotype.Service;

/**
 * Created by tsotne on 6/30/15.
 */
@Service
public class MachineServiceImpl implements MachineService {
    @Override
    public Result eval(Code code) {
        TuringMachine machine = new TuringMachine();
        return machine.eval(code);
    }
}
