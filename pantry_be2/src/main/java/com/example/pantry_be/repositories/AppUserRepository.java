package com.example.pantry_be.repositories;

import com.example.pantry_be.models.AppUser;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface AppUserRepository extends JpaRepository<AppUser, Long> {

    Optional<AppUser> findAppUserByUsername(String username);
    Optional<AppUser> findAppUserByEmail(String email);

    Optional<AppUser> findAppUserByEmailAndPassword(String email, String password);
}