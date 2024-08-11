package app.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import app.constants.Constants;

/**
 * WebConfig
 * 
 * Version 1.0
 * 
 * Date: 12-11-2013
 * 
 * Copyright
 * 
 * Modification Logs:
 * DATE               AUTHOR            DESCRIPTION
 * ------------------------------------------------
 * 12-11-2013         HuyNT2            Create
 */
@Configuration
public class WebConfig implements WebMvcConfigurer {

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**")
                .allowedOrigins(Constants.urlCustomer, Constants.urlStaff)
                .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS")
                .allowedHeaders("*")
                .allowCredentials(true);
        System.out.println(
                "Somethings Somethings Somethings Somethings Somethings Somethings Somethings Somethings Somethings Somethings ");
        System.err.println();
    }
}
