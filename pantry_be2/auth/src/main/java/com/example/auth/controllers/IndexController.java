package com.example.auth.controllers;

import com.example.auth.dto.Cred;
import com.example.auth.services.AuthService;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@CrossOrigin
public class IndexController {

    AuthService service;
    public IndexController(AuthService service) {
        this.service = service;
    }
    @PostMapping("/login")
    public UUID login(@RequestBody Cred creds){
        return this.service.login(creds.username, creds.password);
    }
    @PostMapping("/signup" )
    public void signup(@RequestBody Cred creds){ this.service.signup(creds.username, creds.password); }
    @GetMapping("/logout")
    public void logout(@RequestParam UUID token){
        this.service.logout(token);
    }
    @GetMapping("/checkAuth")
    public void checkAuth(@RequestParam UUID token){
        this.service.checkAuth(token);
    }
}
