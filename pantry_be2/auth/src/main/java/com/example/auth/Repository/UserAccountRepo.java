package com.example.auth.Repository;

import com.example.auth.models.UserAccount;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.UUID;

@Repository
public interface UserAccountRepo extends CrudRepository<UserAccount, UUID> {

    Optional<UserAccount> findByUsername(String username);
}
