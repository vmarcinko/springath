package me.marcinko.springath.web;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.ViewControllerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

/**
 * If one refresh the browser on some web URL, or enters such URL directly, we need to forward the request to index.html for Angular app to process the URl before
 * web servers returns 404 for non-existent resource.
 */
@Configuration
public class AngularRouterConfig implements WebMvcConfigurer {
	@Override
	public void addViewControllers(final ViewControllerRegistry registry) {
		registry.addViewController("/heroes").setViewName("forward:/");
		registry.addViewController("/dashboard").setViewName("forward:/");
	}
}
