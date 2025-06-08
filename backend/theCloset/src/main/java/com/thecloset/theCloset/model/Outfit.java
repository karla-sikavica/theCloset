package com.thecloset.theCloset.model;

import java.util.List;
import java.util.Set;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
@EqualsAndHashCode(exclude = {"clothingItems"})
@AllArgsConstructor
public class Outfit {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "imageurl", nullable = false, columnDefinition = "TEXT")
    private String imageUrl;

    @ManyToOne
    //@JsonBackReference("user-outfits")
    @JoinColumn(name = "user_id", nullable = false)
    @JsonIgnoreProperties({"outfits", "clothingItems"})
    private User user;

   /*@ManyToMany
   @JoinTable(
           name = "outfit_tags",
           joinColumns = @JoinColumn(name = "outfit_id"),
           inverseJoinColumns = @JoinColumn(name = "tags_id")
   )

   @JsonIgnore
   private Set<Tag> tags;*/

    @ManyToMany
    @JoinTable(
            name = "item_outfit",
            joinColumns = @JoinColumn(name = "outfit_id"),
            inverseJoinColumns = @JoinColumn(name = "item_id")
    )
    //@JsonManagedReference("outfit-clothingItems")
    private Set<ClothingItem> clothingItems;
}
