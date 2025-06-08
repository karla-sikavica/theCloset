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

        for (Color color : clothingItem.getColors()) {
            Optional<Color> existingColor = colorRepository.findByName(color.getName());

            if (existingColor.isPresent()) {
                updatedColors.add(existingColor.get());
            } else {
                updatedColors.add(colorRepository.save(color));
            }
        }

        clothingItem.setColors(updatedColors);

        return clothingItemRepository.save(clothingItem);
    }

    public void deleteItem(Long id) {
        clothingItemRepository.deleteById(id);
    }

    public ClothingItem incrementWearCount(Long id) {
        ClothingItem item = clothingItemRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("item not found with id " + id));
        item.setNoOfWears(item.getNoOfWears() + 1);
        return clothingItemRepository.save(item);
    }


}


