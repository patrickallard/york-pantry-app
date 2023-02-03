package com.example.pantry_be.repositories;

import com.example.pantry_be.models.RecipeItem;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RecipeItemRepository extends CrudRepository<RecipeItem, Long> {

}
