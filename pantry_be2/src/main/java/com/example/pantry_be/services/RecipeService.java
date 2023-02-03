package com.example.pantry_be.services;

import com.example.pantry_be.dto.RecipeRequest;
import com.example.pantry_be.models.AppUser;
import com.example.pantry_be.models.Item;
import com.example.pantry_be.models.Recipe;
import com.example.pantry_be.models.RecipeItem;
import com.example.pantry_be.repositories.AppUserRepository;
import com.example.pantry_be.repositories.ItemRepository;
import com.example.pantry_be.repositories.RecipeItemRepository;
import com.example.pantry_be.repositories.RecipeRepository;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class RecipeService {

    private final RecipeRepository recipeRepository;
    private final AppUserRepository appUserRepository;
    private final ItemRepository itemRepository;

    private final RecipeItemRepository recipeItemRepository;

    public RecipeService(RecipeRepository recipeRepository, AppUserRepository appUserRepository, ItemRepository itemRepository, RecipeItemRepository recipeItemRepository) {
        this.recipeRepository = recipeRepository;
        this.appUserRepository = appUserRepository;
        this.itemRepository = itemRepository;
        this.recipeItemRepository = recipeItemRepository;
    }

    public Iterable<Recipe> getAllUserRecipes(Long id) {
        return recipeRepository.findByOwnerId(id);
    }

    public Recipe getRecipeById(Long id) {
        return recipeRepository.findById(id).orElseThrow();
    }

    public void createRecipe(RecipeRequest requestRecipe) {

        Long requestOwnerId = requestRecipe.owner;

        Optional<AppUser> owner = this.appUserRepository.findById(requestOwnerId);

        Recipe newRecipe = new Recipe();
        newRecipeCopy(requestRecipe, newRecipe);

        newRecipe.owner = owner.get();

        recipeRepository.save(newRecipe);

        // making sure that the items associated with the recipe exist
        for (var item : requestRecipe.items) {
            if(item.id != null) {
                var optionalItem = itemRepository.findById(item.id);
                if (optionalItem.isEmpty()) {
                    throw new IllegalStateException();
                }
            }

            Item newItem = new Item();
            copyItem(item, newItem);

            RecipeItem recipeItem = new RecipeItem();
//
//            if (!newItem.recipe.contains(newRecipe)) {
//                newItem.recipe.add(newRecipe);
//            }
            newItem.available = false;
            itemRepository.save(newItem);
        }
    }

    public void updateRecipe(Integer id, RecipeRequest requestRecipe) {
        Long newId = Long.valueOf(id);

        if(requestRecipe.id != null) {
            var recipe = recipeRepository.findById(newId);
            if (recipe.isEmpty()) {
                throw new IllegalStateException();
            }
        }
        Recipe newRecipe = new Recipe();
        System.out.println("requestOwnerid: " + requestRecipe.owner);
        Long requestOwnerId = requestRecipe.owner;

        Optional<AppUser> owner = this.appUserRepository.findById(requestOwnerId);

        copy(requestRecipe, newRecipe);
        newRecipe.owner = owner.get();

        for (var item : requestRecipe.items) {
            if(item.id != null) {
                var optionalItem = itemRepository.findById(item.id);
                if (optionalItem.isEmpty()) {
                    throw new IllegalStateException();
                }
            }

            Item newItem = new Item();
            copyItem(item, newItem);

//            if (!newItem.recipe.contains(newRecipe)) {
//                newItem.recipe.add(newRecipe);
//            }
            newItem.available = false;
            itemRepository.save(newItem);
        }

        recipeRepository.save(newRecipe);
    }

    public void deleteRecipe(Long id) {

        // get item by id
        Optional<Recipe> optionalRecipe = recipeRepository.findById(id);
        // retrieve the recipe associated with item (if there is one)
//        if (!optionalRecipe.get().items.isEmpty()) {
//            for (var item : optionalRecipe.get().items) {
//                Long itemId = item.id;
//                Optional<Item> optionalItem = itemRepository.findById(itemId);
//                // declaring empty recipe var
//                Item tmpItem;
//
//                // sets recipe optional to recipe var
//                tmpItem = optionalItem.get();
//                // removes the item id that matches the item being deleted
//                tmpItem.recipe.removeIf(recipe -> recipe.getId().equals(id));
//
//                itemRepository.save(tmpItem);
//            }
//        }

        recipeRepository.findById(id).orElseThrow();
        recipeRepository.deleteById(id);
    }
    private void copy(RecipeRequest requestRecipe, Recipe updateRecipe) {
        Long newId = (Long.valueOf(requestRecipe.id));

        updateRecipe.id = newId;
        updateRecipe.name = requestRecipe.name;
        updateRecipe.image = requestRecipe.image;
//        updateRecipe.recipeItems = requestRecipe.items;
        updateRecipe.steps = requestRecipe.steps;
    }

    private void newRecipeCopy(RecipeRequest recipeRequest, Recipe newRecipe) {
        newRecipe.name = recipeRequest.name;
        newRecipe.image = recipeRequest.image;
//        newRecipe.recipeItems = recipeRequest.items;
        newRecipe.steps = recipeRequest.steps;
    }

    private void copyItem(Item requestItem, Item updateItem) {
        updateItem.id = requestItem.id;
        updateItem.name = requestItem.name;
        updateItem.weight = requestItem.weight;
        updateItem.calories = requestItem.calories;
        updateItem.image = requestItem.image;
//        updateItem.recipe = requestItem.recipe;
        updateItem.unit = requestItem.unit;
    }

}
