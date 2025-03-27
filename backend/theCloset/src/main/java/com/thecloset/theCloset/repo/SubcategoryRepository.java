package com.thecloset.theCloset.repo;

import com.thecloset.theCloset.model.Subcategory;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;
import java.util.List;

public interface SubcategoryRepository extends JpaRepository<Subcategory, Integer> {
    Optional<Subcategory> findByName(String name);
    List<Subcategory> findByCategoryId(Integer categoryId);
}
