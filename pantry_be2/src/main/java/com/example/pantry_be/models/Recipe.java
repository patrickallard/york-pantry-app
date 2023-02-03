package com.example.pantry_be.models;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.*;

import java.util.List;

@Entity
public class Recipe {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    public Long id;

    public String name;

    public String image;

    @ManyToOne
    @JoinColumn(name = "app_user_id")
    @JsonBackReference
    public AppUser owner;

    @OneToMany
    @JsonManagedReference
    public List<RecipeItem> recipeItems;

    @Column(columnDefinition = "TEXT")
    public String steps;

    public Recipe() {
    }

    @JsonCreator
    public Recipe(@JsonProperty("id") Long id, String name, String image, AppUser owner, List<RecipeItem> recipeItems, String steps, Boolean make) {
        this.id = id;
        this.name = name;
        this.image = image;
        this.owner = owner;
        this.recipeItems = recipeItems;
        this.steps = steps;
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

    public AppUser getOwner() {
        return owner;
    }

    public void setOwner(AppUser owner) {
        this.owner = owner;
    }

    // might want to implement logic that loops through item array and ommits Item
    // field that references recipe
    public List<RecipeItem> getItems() {
        return recipeItems;
    }

    public void setItems(List<RecipeItem> items) {
        this.recipeItems = recipeItems;
    }

    public String getSteps() {
        return steps;
    }

    public void setSteps(String steps) {
        this.steps = steps;
    }
}
