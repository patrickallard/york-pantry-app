package com.example.pantry_be.controllers;

import com.example.pantry_be.models.AppUser;
import com.example.pantry_be.services.AppUserService;
import com.example.pantry_be.services.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.UUID;

@RestController
@RequestMapping("/users")
@CrossOrigin
public class AppUserController {
    final AppUserService appUserService;
    @Autowired
    public AppUserController(AppUserService appUserService) {
        this.appUserService = appUserService;
    }

    @PostMapping
    public AppUser create(@RequestBody AppUser appUserRequest) {
        try {
            return this.appUserService.create(appUserRequest);
        } catch (Exception e) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, e.getMessage());
        }
    }
    @GetMapping(params = {"username"})
    public AppUser getNonUserByUsername(@RequestParam String username) {
        try {
            return appUserService.viewNonUserProfile(username);
        } catch (Exception e) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, e.getMessage());
        }
    }

    @GetMapping(params = {"email", "password"})
    public AppUser getUserProfile(@RequestParam String email) {
        try {
            return appUserService.viewUserProfile(email);
        } catch (Exception e) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, e.getMessage());
        }
    }
    @GetMapping
    public Iterable<AppUser> getAllUsers() {
        try {
            return appUserService.getAllUsers();
        } catch (Exception e) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, e.getMessage());
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<Void> updateAppUser(@RequestBody AppUser appUser) throws Exception {
        try {
            appUserService.updateAppUser(appUser);
            return null;
        } catch (Exception e) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND);
        }
    }

    @DeleteMapping("/{id}")
    private void deleteAppUser(@PathVariable Long id) {
        try {
            appUserService.deleteAppUser(id);
        } catch (IllegalArgumentException e) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST);
        } catch (Exception e){
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, e.getMessage());
        }
    }
}