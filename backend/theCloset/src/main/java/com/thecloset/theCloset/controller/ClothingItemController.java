package com.thecloset.theCloset.controller;

import com.thecloset.theCloset.model.ClothingItem;
import com.thecloset.theCloset.service.ClothingItemService;
import com.thecloset.theCloset.service.OutfitService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

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

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteItem(@PathVariable Long id) {
        clothingItemService.deleteItem(id);
        return ResponseEntity.noContent().build(); // 204 No Content
    }
}
