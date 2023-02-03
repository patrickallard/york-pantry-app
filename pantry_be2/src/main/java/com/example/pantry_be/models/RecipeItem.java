package com.example.pantry_be.models;

import jakarta.persistence.*;

@Entity
public class RecipeItem {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    public Long id;

    @ManyToOne
    public Item item;

    @ManyToOne
    public Recipe recipe;

    public Long quantity;

    public RecipeItem() {}

    public RecipeItem(Long id, Item item, Recipe recipe, Long quantity) {
        this.id = id;
        this.item = item;
        this.recipe = recipe;
        this.quantity = quantity;
    }
}
