package com.example.backend.config;


import lombok.RequiredArgsConstructor;

import org.springframework.security.access.AccessDeniedException;

import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.AuthenticationException;

import org.springframework.security.web.AuthenticationEntryPoint;
import org.springframework.security.web.access.AccessDeniedHandler;

import org.springframework.security.web.authentication.www.BasicAuthenticationFilter;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@RequiredArgsConstructor
@EnableWebSecurity
//@EnableGlobalMethodSecurity(prePostEnabled = true)
public class SecurityConfig extends WebSecurityConfigurerAdapter {
    private final JWTCheckFilter checkFilter;



    @Override
    protected void configure(HttpSecurity http) throws Exception {

        http.
                csrf().disable()
                .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                .and()
                //토큰을 검증
                .addFilterAt(checkFilter, BasicAuthenticationFilter.class)
                .authorizeRequests()
                .antMatchers("/api/**").permitAll()
                .antMatchers("/api/user/**").hasRole("USER");

}
}