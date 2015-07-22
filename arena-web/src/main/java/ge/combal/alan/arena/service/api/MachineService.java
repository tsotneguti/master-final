package ge.combal.alan.arena.service.api;

import ge.combal.alan.turing.Code;
import ge.combal.alan.turing.Result;
import ge.combal.alan.turing.tape.DequeTape;
import ge.combal.alan.turing.tape.Tape;

/**
 * Created by tsotne on 6/30/15.
 */
public interface MachineService {
    Result eval(Code code,DequeTape tape);
}
