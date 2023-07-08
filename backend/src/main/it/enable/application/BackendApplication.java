package it.enable.application;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.core.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.MessageSource;
import org.springframework.context.annotation.Bean;
import org.springframework.context.support.ReloadableResourceBundleMessageSource;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import com.onshape.api.exceptions.OnshapeException;

//@EnableAutoConfiguration
//@SpringBootApplication(exclude = { SecurityAutoConfiguration.class })

@EnableAutoConfiguration
@SpringBootApplication (scanBasePackages = "it.enable")
public class BackendApplication {
	private static final Logger logger = (Logger) LogManager.getLogger(BackendApplication.class);

	public static void main(String[] args) throws OnshapeException {
        SpringApplication.run(BackendApplication.class, args);
    }
    
    @Autowired
    private AppProperties appProperties;
    
    @Bean
    public void readProperties() {
    	logger.info("Build Version : "+appProperties.getBuild_version());
    }
    
//	@Bean
//	public WebMvcConfigurer corsConfigurer() {
//		return new WebMvcConfigurer() {
//			@Override
//			public void addCorsMappings(CorsRegistry registry) {
//				registry.addMapping("/greeting-javaconfig").allowedOrigins("http://localhost:8080");
//			}
//		};
//	}
	
    @Bean
    public MessageSource messageSource() {
        ReloadableResourceBundleMessageSource messageSource
          = new ReloadableResourceBundleMessageSource();
        
        messageSource.setBasename("classpath:messages");
        messageSource.setDefaultEncoding("UTF-8");
        return messageSource;
    }
}
