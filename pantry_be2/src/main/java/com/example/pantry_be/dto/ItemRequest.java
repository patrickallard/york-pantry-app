package com.example.pantry_be.dto;

import com.fasterxml.jackson.annotation.JsonProperty;

public class ItemRequest {

    public Long id;

    public String name;

    public String image;

    public Long weight;

    public String unit;

    public Long calories;

    public Boolean available;

    public Long recipe;
}
