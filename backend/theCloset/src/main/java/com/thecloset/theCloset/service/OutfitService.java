package com.thecloset.theCloset.service;

import com.thecloset.theCloset.model.Outfit;
import com.thecloset.theCloset.repo.OutfitRepository;
import org.springframework.stereotype.Service;

@Service
public class OutfitService {

    private final OutfitRepository outfitRepository;

    public OutfitService(OutfitRepository outfitRepository) {
        this.outfitRepository = outfitRepository;
    }

    public Outfit saveOutfit(Outfit outfit) {
        return outfitRepository.save(outfit);
    }
}
