package com.example.pantry_be.dto;

import com.example.pantry_be.models.Item;
import com.fasterxml.jackson.annotation.JsonCreator;

import java.util.List;

public class RecipeRequest {

    public Integer id;

    public String name;
    public String image;
    public Long owner;
    public List<Item> items;
    public String steps;

    public RecipeRequest() {}

    public RecipeRequest(Integer id, String name, String image, Long owner, List<Item> items, String steps, Boolean make) {
        this.id = id;
        this.name = name;
        this.image = image;
        this.owner = owner;
        this.items = items;
        this.steps = steps;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getImage() {
        return image;
    }

    public void setImage(String image) {
        this.image = image;
    }

    public Long getOwner() {
        return owner;
    }

    public void setOwner(Long owner) {
        this.owner = owner;
    }

    public List<Item> getItems() {
        return items;
    }

    public void setItems(List<Item> items) {
        this.items = items;
    }

    public String getSteps() {
        return steps;
    }

    public void setSteps(String steps) {
        this.steps = steps;
    }

}
