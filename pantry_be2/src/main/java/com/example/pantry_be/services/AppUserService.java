package com.example.pantry_be.services;


import com.example.pantry_be.models.AppUser;
import com.example.pantry_be.repositories.AppUserRepository;
import com.example.pantry_be.repositories.RecipeRepository;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import static org.springframework.http.HttpStatus.OK;

import java.util.UUID;

@Service
public class AppUserService {

    final AppUserRepository appUserRepository;
    private final RecipeRepository recipeRepository;
    private final RecipeService recipeService;

    RestTemplate client;
    @Value("${net.yorksolutions.authUrl}")
    String authUrl;
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

    public AppUserService(AppUserRepository appUserRepository, RecipeRepository recipeRepository, ItemService itemService, RecipeService recipeService) {
        this.appUserRepository = appUserRepository;
        this.recipeRepository = recipeRepository;
        this.recipeService = recipeService;
        this.client = new RestTemplate();
    }

    public Iterable<AppUser> getAllUsers() {
        return appUserRepository.findAll();
    }

    public AppUser create(AppUser appUserRequest) throws Exception {
        if (appUserRepository.findAppUserByUsername(appUserRequest.username).isPresent()) {
            throw new Exception("the username you entered is already associated with an existing account");
        }
        if (appUserRepository.findAppUserByEmail(appUserRequest.email).isPresent()) {
            throw new Exception("the email you entered is already associated with an existing account");
        }
        return this.appUserRepository.save(appUserRequest);
    }

    public AppUser viewNonUserProfile(String username) throws Exception {
        if (appUserRepository.findAppUserByUsername(username).isEmpty()) {
            throw new Exception("other user account not found");
        } else {
            return this.appUserRepository.findAppUserByUsername(username).get();
        }
    }

    public AppUser viewUserProfile(String email) throws Exception {
        if (appUserRepository.findAppUserByEmail(email).isEmpty()) {
            throw new Exception("user account not found");
        } else {
            return this.appUserRepository.findAppUserByEmail(email).get();
        }
    }

    public void updateAppUser(AppUser requestAppUser) {
        if (requestAppUser.id != null) {
            var appUser = appUserRepository.findById(requestAppUser.id);
            if (appUser.isEmpty()) {
                throw new IllegalStateException();
            }
        }

        AppUser newAppUser = new AppUser();
        copy(requestAppUser, newAppUser);

        appUserRepository.save(newAppUser);
    }

    public void deleteAppUser(Long id) {

        for (var recipe : recipeRepository.findByOwnerId(id)) {
            recipe.owner = null;
            recipeService.deleteRecipe(recipe.id);
        }

        appUserRepository.findById(id).orElseThrow();
        appUserRepository.deleteById(id);
    }


    private void copy(AppUser requestAppUser, AppUser updateAppUser) {
        updateAppUser.id = requestAppUser.id;
        updateAppUser.username = requestAppUser.username;
        updateAppUser.email = requestAppUser.email;
        updateAppUser.password = requestAppUser.password;
        updateAppUser.recipes = requestAppUser.recipes;
    }
}