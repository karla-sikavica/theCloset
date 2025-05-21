package com.thecloset.theCloset.DTO;

import com.thecloset.theCloset.model.Subcategory;

public class SubcategoryDTO {
    private Integer id;
    private String name;

    public SubcategoryDTO(Subcategory subcategory) {
        this.id = subcategory.getId();
        this.name = subcategory.getName();
    }
}

