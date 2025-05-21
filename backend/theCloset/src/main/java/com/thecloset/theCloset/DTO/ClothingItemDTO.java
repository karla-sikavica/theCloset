package com.thecloset.theCloset.DTO;

import com.thecloset.theCloset.model.ClothingItem;
import com.thecloset.theCloset.model.Color;
import lombok.Getter;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.Set;
import java.util.stream.Collectors;

@Getter
public class ClothingItemDTO {
    private Integer id;
    private String name;
    private String material;
    private String size;
    private String brand;
    private Boolean gift;
    private BigDecimal price;
    private Integer noOfWears;
    private LocalDate dateAcquired;
    private String season;
    private String imageUrl;
    private String categoryName;
    private String subcategoryName;
    private Set<String> colorNames;

    public ClothingItemDTO(ClothingItem item) {
        this.id = item.getId();
        this.name = item.getName();
        this.material = item.getMaterial();
        this.size = item.getSize();
        this.brand = item.getBrand();
        this.gift = item.getGift();
        this.price = item.getPrice();
        this.noOfWears = item.getNoOfWears();
        this.dateAcquired = item.getDateAcquired();
        this.season = item.getSeason();
        this.imageUrl = item.getImageUrl();
        this.categoryName = item.getCategory() != null ? item.getCategory().getName() : null;
        this.subcategoryName = item.getSubcategory() != null ? item.getSubcategory().getName() : null;
        this.colorNames = item.getColors() != null
                ? item.getColors().stream().map(Color::getName).collect(Collectors.toSet())
                : null;
    }
}

