package com.example.backend.config;


import com.example.backend.model.entity.User;
import com.example.backend.service.UserService;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;
import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@Component
@RequiredArgsConstructor
public class JWTCheckFilter extends OncePerRequestFilter {

    private final UserService userService;

//    public JWTCheckFilter(AuthenticationManager authenticationManager, UserService userService) {
//        super(authenticationManager);
//        this.userService = userService;
//    }

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain chain) throws IOException, ServletException {
        String bearer = request.getHeader(HttpHeaders.AUTHORIZATION);
        if(bearer == null || !bearer.startsWith("Bearer ")){
            try{
                chain.doFilter(request, response);
                return;
            }catch(Exception e){
                System.out.println(e.getMessage());
                response.setStatus(200);
                response.setContentType("application/json;charset=UTF-8");
                response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
                response.getWriter().println("{ \"success\" :" + false+"}" );

            }

        }
        else {
            String token = bearer.substring("Bearer ".length());

            try {
                VerifyResult result = JWTUtil.verify(token);
                User user = (User) userService.loadUserByUsername(result.getUsername());
                UsernamePasswordAuthenticationToken userToken = new UsernamePasswordAuthenticationToken(
                        user.getUsername(), null, user.getAuthorities()
                );
                SecurityContextHolder.getContext().setAuthentication(userToken);
                chain.doFilter(request, response);

            } catch (Exception e) {
                System.out.println(e.getMessage());
                response.setStatus(200);
                response.setContentType("application/json;charset=UTF-8");
                response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
                response.getWriter().println("{ \"success\" :" + false + "}");
            }
        }


    }

}
