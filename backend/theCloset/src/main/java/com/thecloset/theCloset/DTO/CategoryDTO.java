package com.thecloset.theCloset.DTO;

import com.thecloset.theCloset.model.Category;

public class CategoryDTO {
    private Integer id;
    private String name;

    public CategoryDTO(Category category) {
        this.id = category.getId();
        this.name = category.getName();
    }
}

