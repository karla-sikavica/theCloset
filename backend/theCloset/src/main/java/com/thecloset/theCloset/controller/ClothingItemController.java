package com.thecloset.theCloset.controller;

import com.thecloset.theCloset.model.ClothingItem;
import com.thecloset.theCloset.service.ClothingItemService;
import com.thecloset.theCloset.service.OutfitService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/item")
public class ClothingItemController {
    private final ClothingItemService clothingItemService;

    public ClothingItemController(ClothingItemService clothingItemService){
        this.clothingItemService = clothingItemService;
    }

    @PostMapping
    public ResponseEntity<ClothingItem> createItem(@RequestBody ClothingItem clothingItem){
        ClothingItem savedClothingItem = clothingItemService.saveItem(clothingItem);
        return ResponseEntity.ok(savedClothingItem);
    }
}
