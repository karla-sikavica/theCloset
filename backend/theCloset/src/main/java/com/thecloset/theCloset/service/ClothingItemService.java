package com.thecloset.theCloset.service;

import com.thecloset.theCloset.model.ClothingItem;
import com.thecloset.theCloset.model.Color;
import com.thecloset.theCloset.repo.ClothingItemRepository;
import com.thecloset.theCloset.repo.ColorRepository;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.Optional;
import java.util.Set;

@Service
public class ClothingItemService {
    public final ClothingItemRepository clothingItemRepository;
    public final ColorRepository colorRepository; // Add the ColorRepository

    public ClothingItemService(ClothingItemRepository clothingItemRepository, ColorRepository colorRepository) {
        this.clothingItemRepository = clothingItemRepository;
        this.colorRepository = colorRepository;
    }

    public ClothingItem saveItem(ClothingItem clothingItem) {
        Set<Color> updatedColors = new HashSet<>();

        // Iterate through the set of colors in the ClothingItem
        for (Color color : clothingItem.getColors()) {
            Optional<Color> existingColor = colorRepository.findByName(color.getName());

            // If color already exists in the database, use the existing one
            if (existingColor.isPresent()) {
                updatedColors.add(existingColor.get());
            } else {
                // Otherwise, save the new color and add it to the set
                updatedColors.add(colorRepository.save(color));
            }
        }

        // Set the updated colors back to the clothingItem
        clothingItem.setColors(updatedColors);

        // Save the clothing item with the updated colors
        return clothingItemRepository.save(clothingItem);
    }

}


