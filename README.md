# Pantry App :
 
## Description
The pantry project is a full-stack, lightweight, inventory management application designed to help users keep track of items in their pantry. Users can set up individual accounts, giving them access to separate pantries. 
Adding items to recipes changes the item's availability, and marks the item as 'included' in the recipe. Recipes can be 'made' which removes the included items from the pantry.

All entities have full CRUD, including user accounts. 

## Technology Used
1. Angular
2. Spring Boot
3. Docker 

## Database Scheme
The database is made up of four entities: AppUser, Item, RecipeItem, and Recipe. AppUsers create recipes, which in turn are associated to Items through an intermediary entity called recipeItem. This purpose of this entity is to allow a single Item to be associated with many different recipes, since recipes only need a qunatity and id from each Item respectively. 

![pantryDBscheme](https://user-images.githubusercontent.com/107430866/219757598-c8c42dd0-0c21-4ecd-816b-111477c989a5.png)
