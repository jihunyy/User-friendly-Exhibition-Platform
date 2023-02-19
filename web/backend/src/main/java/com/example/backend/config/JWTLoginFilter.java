//package com.example.backend.config;
//
//import com.auth0.jwt.exceptions.TokenExpiredException;
//import com.example.backend.model.dto.LoginDto;
//import com.example.backend.model.dto.LoginFailDto;
//import com.example.backend.model.entity.User;
//import com.example.backend.service.UserService;
//import com.fasterxml.jackson.databind.ObjectMapper;
//
//import lombok.SneakyThrows;
//import org.springframework.http.HttpHeaders;
//import org.springframework.http.MediaType;
//import org.springframework.security.authentication.AuthenticationManager;
//import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
//import org.springframework.security.core.Authentication;
//import org.springframework.security.core.AuthenticationException;
//import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
//
//import javax.servlet.FilterChain;
//import javax.servlet.ServletException;
//import javax.servlet.http.HttpServletRequest;
//import javax.servlet.http.HttpServletResponse;
//import java.io.IOException;
//
//public class JWTLoginFilter extends UsernamePasswordAuthenticationFilter {
//
//    private ObjectMapper objectMapper = new ObjectMapper();
//
//
//    private UserService userService;
//
//
//
//    public JWTLoginFilter(AuthenticationManager authenticationManager, UserService userService) {
//        super(authenticationManager);
//        this.userService = userService;
//        setFilterProcessesUrl("/api/sign-in");
//    }
//
//
//
//
//    @SneakyThrows
//    @Override
//    public Authentication attemptAuthentication(
//            HttpServletRequest request,
//            HttpServletResponse response) throws AuthenticationException
//    {
//        LoginDto userLogin = objectMapper.readValue(request.getInputStream(), LoginDto.class);
////        if (!userService.isValidUser(userLogin)){
////
////            response.setHeader(HttpHeaders.CONTENT_TYPE, MediaType.APPLICATION_JSON_VALUE);
////            response.getOutputStream().write(objectMapper.writeValueAsBytes(new LoginFailDto(false,"invalid user info")));
////            throw new Exception();
////        }
//        if(userLogin.getRefreshToken() == null) {
//            UsernamePasswordAuthenticationToken token = new UsernamePasswordAuthenticationToken(
//                    userLogin.getUsername(), userLogin.getPassword(), null
//            );
//            // user details...
//            return getAuthenticationManager().authenticate(token);
//        }else{
//            VerifyResult verify = JWTUtil.verify(userLogin.getRefreshToken());
//            if(verify.isSuccess()){
//                User user = (User) userService.loadUserByUsername(verify.getUsername());
//                return new UsernamePasswordAuthenticationToken(
//                        user, user.getAuthorities()
//                );
//            }else{
//                throw new TokenExpiredException("refresh token expired");
//            }
//        }
//    }
//
//    @Override
//    protected void successfulAuthentication(
//            HttpServletRequest request,
//            HttpServletResponse response,
//            FilterChain chain,
//            Authentication authResult) throws IOException, ServletException
//    {
//        User user = (User) authResult.getPrincipal();
//        response.setHeader("auth_token", JWTUtil.makeAuthToken(user));
//        response.setHeader("refresh_token", JWTUtil.makeRefreshToken(user));
//        response.setHeader(HttpHeaders.CONTENT_TYPE, MediaType.APPLICATION_JSON_VALUE);
//        response.getOutputStream().write(objectMapper.writeValueAsBytes(user));
//    }
//}
//
