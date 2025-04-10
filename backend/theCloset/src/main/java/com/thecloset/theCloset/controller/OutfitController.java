package com.thecloset.theCloset.controller;

import com.thecloset.theCloset.model.Outfit;
import com.thecloset.theCloset.service.OutfitService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/outfits")
public class OutfitController {

    private final OutfitService outfitService;

    public OutfitController(OutfitService outfitService) {
        this.outfitService = outfitService;
    }

    @PostMapping
    public ResponseEntity<Outfit> createOutfit(@RequestBody Outfit outfit) {
        Outfit savedOutfit = outfitService.saveOutfit(outfit);
        return ResponseEntity.ok(savedOutfit);
    }
}
