package com.thecloset.theCloset.DTO;

import com.thecloset.theCloset.model.Outfit;

import java.util.List;
import java.util.stream.Collectors;

public class OutfitDTO {
    private Integer id;
    private String imageUrl;
    private List<ClothingItemDTO> items;

    public OutfitDTO(Outfit outfit) {
        this.id = outfit.getId();
        this.imageUrl = outfit.getImageUrl();
        this.items = outfit.getClothingItems() != null
                ? outfit.getClothingItems().stream().map(ClothingItemDTO::new).collect(Collectors.toList())
                : null;
    }
}

