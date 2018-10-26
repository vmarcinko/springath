package me.marcinko.springath.web;

import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.builders.WebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.crypto.password.NoOpPasswordEncoder;

@Configuration
public class WebSecurityConfig extends WebSecurityConfigurerAdapter {
	private static String ADMIN_ROLE = "admin";
	private static String GUEST_ROLE = "guest";


	@Override
	public void configure(final WebSecurity web) throws Exception {
//		web.ignoring().antMatchers("/api/**");
	}

	@Override
	protected void configure(final AuthenticationManagerBuilder auth) throws Exception {
		auth.inMemoryAuthentication().passwordEncoder(NoOpPasswordEncoder.getInstance())
				.withUser("admin").password("admin").roles(ADMIN_ROLE)
				.and()
				.withUser("guest").password("guest").roles(GUEST_ROLE);
	}

	@Override
	protected void configure(final HttpSecurity http) throws Exception {
		http
				.csrf().disable()
				.authorizeRequests()
				.antMatchers(HttpMethod.OPTIONS, "/api/**").permitAll() // allow CORS option calls
				.antMatchers("/api/**").hasAnyRole(ADMIN_ROLE)
				.anyRequest().permitAll()
				.and()
				.httpBasic()
		;
	}
}
