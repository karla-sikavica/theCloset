package com.thecloset.theCloset.service;

import com.thecloset.theCloset.model.Color;
import com.thecloset.theCloset.model.Outfit;
import com.thecloset.theCloset.repo.ColorRepository;
import com.thecloset.theCloset.repo.OutfitRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ColorService {
    private final ColorRepository colorRepository;

    public ColorService(ColorRepository colorRepository) {
        this.colorRepository = colorRepository;
    }

    public Color saveColor(Color color) {
        return colorRepository.save(color);
    }

    public List<Color> getAllColors() {
        return colorRepository.findAll();
    }

}
