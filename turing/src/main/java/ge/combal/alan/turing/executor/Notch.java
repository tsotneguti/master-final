package ge.combal.alan.turing.executor;

public class Notch {

    private final Integer id;

    public Notch(Integer id) {
        this.id = id;
    }


    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        Notch notch = (Notch) o;

        return !(id != null ? !id.equals(notch.id) : notch.id != null);

    }

    @Override
    public int hashCode() {
        return id != null ? id.hashCode() : 0;
    }
}
