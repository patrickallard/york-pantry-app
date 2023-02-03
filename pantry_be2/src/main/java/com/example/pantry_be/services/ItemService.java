package com.example.pantry_be.services;

import com.example.pantry_be.dto.ItemRequest;
import com.example.pantry_be.models.Item;
import com.example.pantry_be.models.Recipe;
import com.example.pantry_be.repositories.ItemRepository;
import com.example.pantry_be.repositories.RecipeRepository;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class ItemService {

    private final ItemRepository itemRepository;
    private final RecipeRepository recipeRepository;


    public ItemService(ItemRepository itemRepository, RecipeRepository recipeRepository) {
        this.itemRepository = itemRepository;
        this.recipeRepository = recipeRepository;
    }
    public Iterable<Item> getAllItems() {
        return itemRepository.findAll();
    }

    public Item getItemById(Long id) {
        return itemRepository.findById(id).orElseThrow();
    }

    public void createItem(Item requestItem) {
        if(requestItem.id != null) {
            var item = itemRepository.findById(requestItem.id);
            if (item.isPresent()) {
                throw new IllegalStateException();
            }
        }
        requestItem.available = true;
        itemRepository.save(requestItem);
    }

    public void updateItem(Long id, ItemRequest requestItem) {
        Optional<Item> optionalItem = itemRepository.findById(id);

        if(!optionalItem.isEmpty()) {
            var item = itemRepository.findById(id);
            if (item.isEmpty()) {
                throw new IllegalStateException();
            }
        }

        Item newItem = new Item();
        copy(requestItem, newItem);
        // Eventually, need to include logic that updates any recipeItems that share an id with the item being updated
        // if this item is associated with recipeItems, then it will need to update that information (image, calories, units)
        itemRepository.save(newItem);
    }

    public void deleteItem(Long id) {
        // get item by id
        Optional<Item> optionalItem = itemRepository.findById(id);

        // retrieves all the item in question from the recipe repo and sets it to null
        // retrieve the recipe associated with item (if there is one)
        if (optionalItem.get().recipeItems != null) {
            for (var recipe : optionalItem.get().recipeItems) {
                var optionalRecipe = recipeRepository.findById(recipe.id);

                Recipe requestRecipe = optionalRecipe.get();
                Recipe newRecipe = new Recipe();
                copyRecipe(requestRecipe, newRecipe);

                // removes the item id that matches the item being deleted
                // should remove the item from the recipe list
//                recipe.recipeItems.removeIf(item -> item.getId().equals(id));
//                recipeRepository.save(recipe);
            }
        }

        Item item;
        item = optionalItem.get();
//        item.recipe = null;

        itemRepository.findById(item.id).orElseThrow();
        itemRepository.deleteById(item.id);
    }
    private void copy(ItemRequest requestItem, Item updateItem) {
        updateItem.id = requestItem.id;
        updateItem.name = requestItem.name;
        updateItem.weight = requestItem.weight;
        updateItem.calories = requestItem.calories;
        updateItem.image = requestItem.image;
        updateItem.unit = requestItem.unit;
//        updateItem.recipe = null;
    }

    private void copyRecipe(Recipe requestRecipe, Recipe updateRecipe) {
        Long newId = (Long.valueOf(requestRecipe.id));
        updateRecipe.id = newId;
        updateRecipe.name = requestRecipe.name;
        updateRecipe.image = requestRecipe.image;
//        updateRecipe.items = requestRecipe.items;
        updateRecipe.steps = requestRecipe.steps;
    }
}
