package com.thecloset.theCloset.repo;

import com.thecloset.theCloset.model.Outfit;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface OutfitRepository extends JpaRepository<Outfit, Integer> {
    List<Outfit> findByUser_Id(Integer userId);

    @Query("SELECT o FROM Outfit o LEFT JOIN FETCH o.clothingItems WHERE o.user.id = :userId")
    List<Outfit> findByUserIdWithClothingItems(@Param("userId") Integer userId);

}

