package com.thecloset.theCloset.controller;

import com.thecloset.theCloset.model.Outfit;
import com.thecloset.theCloset.service.OutfitService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/outfits")
public class OutfitController {

    private final OutfitService outfitService;

    public OutfitController(OutfitService outfitService) {
        this.outfitService = outfitService;
    }

    @PostMapping(consumes = "application/json", produces = "application/json")
    public ResponseEntity<Outfit> createOutfit(@RequestBody Outfit outfit) {
        Outfit savedOutfit = outfitService.saveOutfit(outfit);
        return ResponseEntity.ok(savedOutfit);
    }

    @GetMapping
    public ResponseEntity<List<Outfit>> getAllOutfits() {
        List<Outfit> outfits = outfitService.getAllOutfits();
        return ResponseEntity.ok(outfits);
    }

    // ✅ (opcionalno) Dohvati outfite za određenog korisnika po ID-u
    @GetMapping("/user/{userId}")
    public ResponseEntity<List<Outfit>> getOutfitsByUserId(@PathVariable Integer userId) {
        List<Outfit> userOutfits = outfitService.getOutfitsByUserId(userId);
        return ResponseEntity.ok(userOutfits);
    }
}
