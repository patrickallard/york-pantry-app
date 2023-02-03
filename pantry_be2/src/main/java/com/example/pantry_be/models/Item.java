package com.example.pantry_be.models;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonSetter;
import jakarta.persistence.*;

import java.util.List;

@Entity
public class Item {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    public Long id;

    public String name;

    public String image;

    public Long weight;

    public String unit;

    public Long calories;

    @JsonProperty
    public Boolean available;

    @OneToMany
    @JoinColumn(name = "recipe_id", nullable = true)
    @JsonBackReference
    public List<RecipeItem> recipeItems;

    public Item(Long id, String name, String image, Long weight, Long calories, Boolean available, List<RecipeItem> recipeItems) {
        this.id = id;
        this.name = name;
        this.image = image;
        this.weight = weight;
        this.calories = calories;
        this.recipeItems = recipeItems;
        this.available = available;
    }

    public Item() {

    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
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

    public Long getWeight() {
        return weight;
    }

    public void setWeight(Long weight) {
        this.weight = weight;
    }

    public Long getCalories() {
        return calories;
    }

    public void setCalories(Long calories) {
        this.calories = calories;
    }

    public List<RecipeItem> getRecipe() {
        return recipeItems;
    }

    public void setRecipe(List<RecipeItem> recipeItems) {
        this.recipeItems = recipeItems;
    }

    public Boolean getAvailable() {
        return available;
    }

    @JsonSetter
    public void setAvailable(Boolean available) {
        this.available = available;
    }
}
