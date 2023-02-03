package com.example.pantry_be.controllers;

import com.example.pantry_be.dto.ItemRequest;
import com.example.pantry_be.models.Item;
import com.example.pantry_be.services.ItemService;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

@RestController
@CrossOrigin
@RequestMapping("/items")
public class ItemController {

    private final ItemService itemService;

    public ItemController(ItemService itemService) {
        this.itemService = itemService;
    }

    @GetMapping
    private Iterable<Item> getAllItems() {
        try {
            return itemService.getAllItems();
        } catch (Exception e) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, e.getMessage());
        }
    }

    @GetMapping("/{id}")
    private Item getItemById(@PathVariable Long id) {
        try {
            return itemService.getItemById(id);
        } catch (Exception e) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND);
        }
    }

    @PostMapping(consumes = MediaType.APPLICATION_JSON_VALUE)
    private void createItem(@RequestBody Item item) {
        try {
            itemService.createItem(item);
        } catch (IllegalStateException e){
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST);
        } catch (IllegalArgumentException e){
            throw new ResponseStatusException(HttpStatus.PRECONDITION_FAILED);
        } catch (Exception e) {
            throw new ResponseStatusException(HttpStatus.NOT_MODIFIED, e.getMessage());
        }
    }

    @PutMapping("/{id}")
    private void updateItem(@PathVariable Long id, @RequestBody ItemRequest item) {
        try {
            itemService.updateItem(id, item);
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
            itemService.deleteItem(id);
        } catch (IllegalArgumentException e) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST);
        } catch (Exception e){
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, e.getMessage());
        }
    }
}
