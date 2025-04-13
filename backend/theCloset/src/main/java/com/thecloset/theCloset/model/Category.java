package com.thecloset.theCloset.model;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "category")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Category {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(unique = true, nullable = false, length = 100)
    private String name;

    @OneToMany(mappedBy = "category", cascade = CascadeType.ALL)
    @JsonManagedReference("category-subcategories")
    private List<Subcategory> subcategories;

    @OneToMany(mappedBy = "category")
    @JsonManagedReference("category-clothingItems")  // This should correspond to the back-reference name from ClothingItem
    private List<ClothingItem> clothingItems;


}
