package com.thecloset.theCloset.controller;

import com.thecloset.theCloset.DTO.OutfitDTO;
import com.thecloset.theCloset.model.Outfit;
import com.thecloset.theCloset.service.OutfitService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

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

   /* @GetMapping("/user/{userId}")
    public ResponseEntity<List<Outfit>> getOutfitsByUserId(@PathVariable Integer userId) {
        List<Outfit> userOutfits = outfitService.getOutfitsByUserId(userId);
        return ResponseEntity.ok(userOutfits);
    }*/

    @GetMapping("/user/{userId}")
    public ResponseEntity<List<OutfitDTO>> getOutfitsByUserId(@PathVariable Integer userId) {
        List<Outfit> userOutfits = outfitService.getOutfitsByUserId(userId);

        // Pretvori listu u DTO listu
        List<OutfitDTO> outfitDTOs = userOutfits.stream()
                .map(OutfitDTO::new)
                .collect(Collectors.toList());

        return ResponseEntity.ok(outfitDTOs);
    }
}
