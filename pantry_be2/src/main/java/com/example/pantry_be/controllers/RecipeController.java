package com.example.pantry_be.controllers;

import com.example.pantry_be.dto.RecipeRequest;
import com.example.pantry_be.models.Recipe;
import com.example.pantry_be.services.RecipeService;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

@RestController
@CrossOrigin
@RequestMapping("/recipes")
public class RecipeController {

    private final RecipeService recipeService;

    public RecipeController(RecipeService recipeService) {
        this.recipeService = recipeService;
    }

    @GetMapping(params = "userId")
    private Iterable<Recipe> getAllUserRecipes(Long userId) {
        try {
            return recipeService.getAllUserRecipes(userId);
        } catch (Exception e) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, e.getMessage());
        }
    }

    @GetMapping("/{id}")
    private Recipe getRecipeById(@PathVariable Long id) {
        try {
            return recipeService.getRecipeById(id);
        } catch (Exception e) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND);
        }
    }

    @PostMapping(consumes = MediaType.APPLICATION_JSON_VALUE)
    private void createRecipe(@RequestBody RecipeRequest recipe) {
        try {
            recipeService.createRecipe(recipe);
        } catch (IllegalStateException e){
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST);
        } catch (IllegalArgumentException e){
            throw new ResponseStatusException(HttpStatus.PRECONDITION_FAILED);
        } catch (Exception e) {
            throw new ResponseStatusException(HttpStatus.NOT_MODIFIED, e.getMessage());
        }
    }

    @PutMapping("/{id}")
    private void updateRecipe(@PathVariable Integer id, @RequestBody RecipeRequest recipe) {
        try {
            recipeService.updateRecipe(id, recipe);
        } catch (IllegalArgumentException e){
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED);
        } catch (IllegalStateException e){
            throw new ResponseStatusException(HttpStatus.NOT_MODIFIED);
        } catch (Exception e) {
            throw new ResponseStatusException(HttpStatus.MULTI_STATUS);
        }
    }

    @DeleteMapping("/{id}")
    private void deleteProduct(@PathVariable Long id) {
        try {
            recipeService.deleteRecipe(id);
        } catch (IllegalArgumentException e) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST);
        } catch (Exception e){
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, e.getMessage());
        }
    }
}
