package ge.combal.alan.turing.parser;

import ge.combal.alan.turing.executor.Command;
import ge.combal.alan.turing.executor.Fragment;
import ge.combal.alan.turing.executor.Notch;

import java.util.Arrays;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

public class Parser {

    private static final Set<String> commands;

    static {
        Command[] values = Command.values();
        commands = new HashSet<String>();
        for (Command value : values) {
            commands.add(value.name());
        }
    }


    public Parser() {

    }

    public Fragment parseCommand(String cmd) {

        String cmdStr = cmd.substring(0, 1);

        if (!commands.contains(cmdStr)) {
            return null;
        }


        Command command = Command.valueOf(cmdStr);


        Fragment fragment = new Fragment(command);

        fillFragment(command, fragment, cmd);

        return fragment;
    }

    private void fillFragment(Command command, Fragment fragment, String cmd) {
        switch (command) {
            case G:
                fragment.setNotch(parseNotch(cmd.substring(1)));
                break;
            case I:
                fragment.setSymbol(cmd.charAt(1));
                fragment.setNotch(parseNotch(cmd.substring(2)));
                break;
            case W:
                fragment.setSymbol(cmd.charAt(1));
        }
    }

    public Notch parseNotch(String command) {
        Integer id = new Integer(command);
        return  new Notch(id);
    }
}
