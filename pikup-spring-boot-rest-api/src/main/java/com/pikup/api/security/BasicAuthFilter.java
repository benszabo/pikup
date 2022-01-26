//package com.pikup.api.security;
//
//import com.pikup.api.controller.UserController;
//import com.pikup.api.model.User;
//import org.springframework.security.authentication.AuthenticationManager;
//import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
//import org.springframework.security.core.AuthenticationException;
//import org.springframework.security.core.context.SecurityContextHolder;
//import org.springframework.security.web.authentication.www.BasicAuthenticationFilter;
//import org.springframework.stereotype.Component;
//
//import javax.servlet.FilterChain;
//import javax.servlet.ServletException;
//import javax.servlet.http.HttpServletRequest;
//import javax.servlet.http.HttpServletResponse;
//import java.io.IOException;
//import java.util.ArrayList;
//
//@Component
//public class BasicAuthFilter extends BasicAuthenticationFilter {
//
//    public BasicAuthFilter(AuthenticationManager authenticationManager) {
//        super(authenticationManager);
//    }
//
//    @Override
//    protected void doFilterInternal(HttpServletRequest req, HttpServletResponse res, FilterChain chain) throws ServletException, IOException {
//        UsernamePasswordAuthenticationToken authentication = authenticate(req);
//        SecurityContextHolder.getContext().setAuthentication(authentication);
//        chain.doFilter(req, res);
//    }
//
//    private UsernamePasswordAuthenticationToken authenticate(HttpServletRequest req) throws AuthenticationException {
//        String username = req.getHeader("Username");
//        String password = req.getHeader("Password");
//
//        UserController userController = new UserController();
//        User user = userController.getUsersByUsername(username).getBody();
//        if (user.getPassword().equals(password))
//            return new UsernamePasswordAuthenticationToken(username, password, new ArrayList<>());
//        else return null;
//    }
//}
