package ge.combal.alan.turing.tape;

import java.util.Collection;
import java.util.Deque;
import java.util.LinkedList;

public class DequeTape implements Tape {


    private Deque<Character> right;
    private Deque<Character> left;

    private Character current = EMPTY_SYMBOL;


    public DequeTape() {
        this(new LinkedList<Character>());
    }

    public DequeTape(Collection<Character> tape) {
        right = new LinkedList<Character>(tape);
        left = new LinkedList<Character>();
    }

    public Tape right() {
        left.addLast(current);
        current = (right.isEmpty() ? EMPTY_SYMBOL : right.pollFirst());
        return this;
    }

    public Tape left() {

        right.addFirst(current);
        current = (left.isEmpty() ? EMPTY_SYMBOL : right.pollLast());
        return this;
    }

    public Tape write(char c) {
        current = c;
        return this;
    }

    public char read() {
        return current;
    }

    public Collection<Character> getTapeAsCollection() {
        Collection<Character> collection = new LinkedList<Character>(left);
        collection.add(current);
        collection.addAll(right);
        return collection;
    }

    @Override
    public String toString() {
        Collection<Character> tape = getTapeAsCollection();
        
        StringBuilder builder = new StringBuilder();

        for (Character character : tape) {
            builder.append(character);
        }

        return builder.toString();
    }
}
