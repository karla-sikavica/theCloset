package com.thecloset.theCloset.repo;

import com.thecloset.theCloset.model.Outfit;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface OutfitRepository extends JpaRepository<Outfit, Integer> {
    List<Outfit> findByUserId(Integer userId);
}

