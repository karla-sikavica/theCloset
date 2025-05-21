package com.thecloset.theCloset.model;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.Set;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class ClothingItem {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(unique = true, nullable = false, length = 255)
    private String name;

    @Column(length = 100)
    private String material;

    @Column(length = 50)
    private String size;

    @Column(length = 100)
    private String brand;

    private Boolean gift = false;

    @Column(precision = 10, scale = 2)
    private BigDecimal price;

    private Integer noOfWears = 0;

    private LocalDate dateAcquired;

    @Column(length = 50)
    private String season;

    @Column(name = "imageurl", nullable = false, columnDefinition = "TEXT")
    private String imageUrl;

    @ManyToOne
    @JsonBackReference("user-clothingItems")
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @ManyToOne
    @JsonBackReference("category-clothingItems")
    @JoinColumn(name = "category_id", nullable = false)
    private Category category;

    @ManyToOne
    @JoinColumn(name = "subcategory_id")
    @JsonBackReference("subcategory-clothingItems")
    private Subcategory subcategory;


    @ManyToMany
    @JoinTable(
            name = "clothing_item_colors",
            joinColumns = @JoinColumn(name = "clothing_item_id"),
            inverseJoinColumns = @JoinColumn(name = "color_id")
    )
    private Set<Color> colors;

    @ManyToMany(mappedBy = "clothingItems")
    //@JsonBackReference("outfit-clothingItems")
    @JsonIgnore
    private Set<Outfit> outfits;
}

