package com.pikup.api.security;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.www.BasicAuthenticationFilter;
import org.springframework.stereotype.Component;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.ArrayList;

@Component
public class BasicAuthFilter extends BasicAuthenticationFilter {

    public BasicAuthFilter(AuthenticationManager authenticationManager) {
        super(authenticationManager);
    }

    @Override
    protected void doFilterInternal(HttpServletRequest req, HttpServletResponse res, FilterChain chain) throws ServletException, IOException {
        UsernamePasswordAuthenticationToken authentication = authenticate(req);
        SecurityContextHolder.getContext().setAuthentication(authentication);
        chain.doFilter(req, res);
    }

    private UsernamePasswordAuthenticationToken authenticate(HttpServletRequest req) throws AuthenticationException {
        String basic = req.getHeader("Authorization");

        if (basic!=null && basic.equals("Basic YWRtaW46YWRtaW4="))
            return new UsernamePasswordAuthenticationToken(null, "", new ArrayList<>());
        else return null;
    }
}
