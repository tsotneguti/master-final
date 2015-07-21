package ge.combal.alan.arena.conficuration;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.view.InternalResourceViewResolver;

/**
 * Created by tsotne on 7/21/15.
 */
@Configuration
public class MvcConfiguration {
    @Bean
    public InternalResourceViewResolver getInternalResourceViewResolver() {
        InternalResourceViewResolver internalResourceViewResolver = new InternalResourceViewResolver();
        internalResourceViewResolver.setPrefix("/views/");
        internalResourceViewResolver.setSuffix(".html");
        return internalResourceViewResolver;
    }

}
