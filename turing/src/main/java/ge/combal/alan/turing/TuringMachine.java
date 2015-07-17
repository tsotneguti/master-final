package ge.combal.alan.turing;

import ge.combal.alan.turing.executor.Machine;
import ge.combal.alan.turing.tape.DequeTape;

import java.util.ArrayList;
import java.util.Arrays;

public class TuringMachine {

    public Result eval(Code code){
        Machine machine = new Machine(new DequeTape(code.getTape()));

        machine.eval(code.getCode());
        Result result = new Result();
        result.setResult(machine.toString());
        return result;
    }

}
