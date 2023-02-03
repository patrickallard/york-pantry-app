package com.example.auth.models;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;

import java.util.UUID;

@Entity
public class UserAccount {

    @Id
    @GeneratedValue
    public UUID id;

    public String username;

    public String password;

    public UserAccount(){}
    public UserAccount(String username, String password){
        this.password = password;
        this.username = username;
    }
}
