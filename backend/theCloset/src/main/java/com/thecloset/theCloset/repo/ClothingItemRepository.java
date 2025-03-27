package com.thecloset.theCloset.repo;

import com.thecloset.theCloset.model.ClothingItem;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import java.util.Optional;

public interface ClothingItemRepository extends JpaRepository<ClothingItem, Long> {
    List<ClothingItem> findByUserId(Long userId);
    Optional<ClothingItem> findByName(String name);
}
