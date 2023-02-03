package com.example.pantry_be.models;

import com.fasterxml.jackson.annotation.*;
import jakarta.persistence.*;
import java.util.List;

@Entity
@Table (name = "appUser")
public class AppUser {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    public Long id;


    public String username;

    @JsonProperty("email")
    public String email;

    @JsonProperty("password")
    public String password;

    @OneToMany(cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonManagedReference
    public List<Recipe> recipes;

    public AppUser(Long id, String username, String email, String password, List<Recipe> recipes) {
        this.id = id;
        this.username = username;
        this.email = email;
        this.password = password;
        this.recipes = recipes;
    }

    public AppUser() {}

    @JsonSetter("email")
    public void setEmail(String email) {
        this.email = email;
    }

    @JsonGetter("password")
    // setting it so return null or "" is not a great solution
    // it sets the local storage value to the respective value, but
    // it fills the edit form field to the incorrect value, possibly introduction
    // unintended submissions
    // Could be avoided by restricting form submission with empty fields
    public String getPassword() {
        return password;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getEmail() {
        return email;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public List<Recipe> getRecipes() {
        return recipes;
    }

    public void setRecipes(List<Recipe> recipes) {
        this.recipes = recipes;
    }
}

