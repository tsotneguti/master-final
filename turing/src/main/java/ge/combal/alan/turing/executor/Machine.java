package ge.combal.alan.turing.executor;

import com.sun.org.apache.bcel.internal.generic.GOTO;
import ge.combal.alan.turing.parser.Parser;
import ge.combal.alan.turing.tape.DequeTape;
import ge.combal.alan.turing.tape.Tape;

import java.util.*;

public class Machine {

    private Tape tape;
    private Parser parser;
    Map<Notch, Integer> notches;
    List<Fragment> code;
    private int i;

    public Machine() {
        this(new DequeTape());
    }

    public Machine(DequeTape tape) {
        this.tape = tape;
        this.parser = new Parser();
        notches = new HashMap<>();
        code = new ArrayList<>();
    }

    public void eval(String[] commands) {
        for (String command : commands) {
            command(command);
        }

        eval();
    }

    private void eval() {
        for (i = 0; i < code.size(); i++) {
            exec(code.get(i));
        }
    }

    private void command(String command) {

        Fragment fragment;
        fragment = parser.parseCommand(command);
        Notch notch = null;

        if (fragment == null) {
            notch = parser.parseNotch(command);
            notches.put(notch, code.size());
        } else {
            code.add(fragment);
        }


    }

    private void exec(Fragment fragment) {

        switch (fragment.getCommand()) {
            case L:
                tape.left();
                break;
            case R:
                tape.right();
                break;
            case S:
                stop();
                break;
            case G:
                goTo(fragment.getNotch());
                break;
            case I:
                if (fragment.getSymbol() == tape.read()) {
                    goTo(fragment.getNotch());
                }
                break;
            case W:
                tape.write(fragment.getSymbol());
                break;
        }
    }


    private void goTo(Notch notch) {
        if (!notches.containsKey(notch)) {
            stop();
        }

        i = notches.get(notch);

        i--;
    }

    private void stop() {
        i = code.size();
    }

    public String toString(){
        return tape.toString();
    }

}
