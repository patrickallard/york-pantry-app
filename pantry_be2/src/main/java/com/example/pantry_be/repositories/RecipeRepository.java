package com.example.pantry_be.repositories;

import com.example.pantry_be.models.Recipe;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RecipeRepository extends CrudRepository<Recipe, Long> {
    Iterable<Recipe> findByOwnerId(Long id);

    // Recipe findRecipeByItemsId(Long id);
}
