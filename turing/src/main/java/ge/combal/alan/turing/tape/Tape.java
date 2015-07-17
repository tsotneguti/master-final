package ge.combal.alan.turing.tape;

import java.util.Collection;

public interface Tape {


    char EMPTY_SYMBOL = ' ';

    Tape right();
    Tape left();
    Tape write(char c);
    char read();
    Collection<Character> getTapeAsCollection();

}
