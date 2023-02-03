package com.example.auth.services;

import com.example.auth.Repository.UserAccountRepo;
import com.example.auth.models.UserAccount;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.HashMap;
import java.util.UUID;

@Service
public class AuthService {
    UserAccountRepo repo;
    HashMap<UUID, UUID> token_map;
    public AuthService(UserAccountRepo repo){
        this.repo = repo;
        this.token_map = new HashMap<>();
    }
    public UUID login(String username, String password) {
        var _user = this.repo.findByUsername(username);
        if(_user.isEmpty()){
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST);
        }
        var user = _user.get();
        if(!user.password.equals(password)) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED);
        }
        var token = UUID.randomUUID();
        token_map.put(token, user.id);
        return token;
    }
    public void signup(String username, String password) {
        var _user = this.repo.findByUsername(username);
        if (_user.isPresent()){
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST);
        }
        this.repo.save(new UserAccount(username, password));
    }
    public void logout(UUID token){
        this.token_map.remove(token);
    }
    public void checkAuth(UUID token){
        if(!this.token_map.containsKey(token)){
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED);
        }
    }
}
