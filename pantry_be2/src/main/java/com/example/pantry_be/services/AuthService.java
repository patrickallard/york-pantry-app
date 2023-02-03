package com.example.pantry_be.services;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import static org.springframework.http.HttpStatus.OK;

import java.util.UUID;

@Service
public class AuthService {

    RestTemplate client;
    @Value("${net.yorksolutions.authUrl}")
    String authUrl;

    public AuthService(){
        this.client = new RestTemplate();
    }
    public boolean check_token(UUID token){
        var url = String.format("%s/checkAuth?token=%s", this.authUrl, token) ;
        try {
            ResponseEntity<Void> response = this.client.getForEntity(url, Void.class);
            if (OK.equals(response.getStatusCode())) {
                return true;
            }
        } catch (Exception e){
            return false;
        }
        return false;
    }
}
