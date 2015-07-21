package ge.combal.alan.arena.domain;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

/**
 * Created by nati on 03.07.2015.
 */
@Document
public class Test {

    @Id
    private String id;

    private String problemId;

    private List<Example> tests;

    public Test() {
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getProblemId() {
        return problemId;
    }

    public void setProblemId(String problemId) {
        this.problemId = problemId;
    }

    public List<Example> getTests() {
        return tests;
    }

    public void setTests(List<Example> tests) {
        this.tests = tests;
    }
}
