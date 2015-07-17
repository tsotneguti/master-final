package ge.combal.alan.arena.domain;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

/**
 * Created by nati on 03.07.2015.
 */
@Document
public class Test {

    @Id
    private String id;

    private String name;

    public Test() {
    }

    public Test(String name) {
        this.name = name;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
}
