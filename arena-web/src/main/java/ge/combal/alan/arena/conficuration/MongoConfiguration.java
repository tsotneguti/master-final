package ge.combal.alan.arena.conficuration;

import com.mongodb.Mongo;
import com.mongodb.MongoClient;
import com.mongodb.ServerAddress;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.PropertySource;
import org.springframework.core.env.Environment;
import org.springframework.data.mongodb.config.AbstractMongoConfiguration;
import org.springframework.data.mongodb.repository.config.EnableMongoRepositories;

import java.util.Collections;

@Configuration
@EnableMongoRepositories(basePackages = {"ge.combal.alan.arena.security", "ge.combal.alan.arena.repository"})
@PropertySource("file:${user.home}/.alan/alan.properties")
public class MongoConfiguration extends AbstractMongoConfiguration {

    @Autowired
    private Environment env;

    @Override
    public String getDatabaseName() {
        return "alan";
    }

    @Override
    @Bean
    public Mongo mongo() throws Exception {
        return new MongoClient(Collections.singletonList(new ServerAddress(getHost(), getPort())));
    }

    private String getHost() {
        String host = env.getProperty("mongo.server");
        return host == null ? "localhost" : host;
    }

    private Integer getPort() {
        String port = env.getProperty("mongo.port");
        return port == null ? 27017 : new Integer(port);
    }

}
