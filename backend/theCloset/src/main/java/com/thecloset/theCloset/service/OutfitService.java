package com.thecloset.theCloset.service;

import com.thecloset.theCloset.model.ClothingItem;
import com.thecloset.theCloset.model.Outfit;
import com.thecloset.theCloset.repo.OutfitRepository;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class OutfitService {

    private final OutfitRepository outfitRepository;

    @PersistenceContext
    private EntityManager entityManager;

    public OutfitService(OutfitRepository outfitRepository) {
        this.outfitRepository = outfitRepository;
    }

    public Outfit saveOutfit(Outfit outfit) {
        return outfitRepository.save(outfit);
    }

    public List<Outfit> getAllOutfits() {
        return outfitRepository.findAll();
    }

    public List<Outfit> getOutfitsByUserId(Integer userId) {
        return outfitRepository.findByUserIdWithClothingItems(userId);
    }

    @Transactional
    public void deleteOutfit(Integer id) {
        Outfit outfit = outfitRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("outfit not found with id: " + id));

        for (ClothingItem item : outfit.getClothingItems()) {
            item.getOutfits().remove(outfit);
            entityManager.merge(item);
        }

        outfit.getClothingItems().clear();
        entityManager.merge(outfit);

        outfitRepository.delete(outfit);
    }
}
