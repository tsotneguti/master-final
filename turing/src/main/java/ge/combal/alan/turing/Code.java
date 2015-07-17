package ge.combal.alan.turing;

import java.util.ArrayList;

/**
 * Created by tsotne on 6/30/15.
 */
public class Code {
    private String[] code;

    private ArrayList<Character> tape;

    public Code() {
    }

    public String[] getCode() {
        return code;
    }

    public void setCode(String[] code) {
        this.code = code;
    }

    public ArrayList<Character> getTape() {
        return tape;
    }

    public void setTape(ArrayList<Character> tape) {
        this.tape = tape;
    }
}
