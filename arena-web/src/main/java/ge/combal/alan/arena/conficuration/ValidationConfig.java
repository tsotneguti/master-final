package ge.combal.alan.arena.conficuration;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.validation.Validator;
import org.springframework.validation.beanvalidation.LocalValidatorFactoryBean;


/**
 * Created by nati on 03.07.2015.
 */
@Configuration
public class ValidationConfig {
    @Bean
    public Validator getValidator(){
        return new LocalValidatorFactoryBean();
    }
}
