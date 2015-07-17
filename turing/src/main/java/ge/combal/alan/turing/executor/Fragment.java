package ge.combal.alan.turing.executor;

public class Fragment {

    Command command;
    private Notch notch;
    private char symbol;

    public Fragment(Command command) {
        this.command = command;
    }

    public Command getCommand() {
        return command;
    }

    public void setNotch(Notch notch) {
        this.notch = notch;
    }

    public void setSymbol(char symbol) {
        this.symbol = symbol;
    }

    public char getSymbol() {
        return symbol;
    }

    public Notch getNotch() {
        return notch;
    }
}
