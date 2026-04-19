package com.buildright.service;

import com.buildright.entity.ArchitecturalPlan;
import com.buildright.repository.ArchitecturalPlanRepository;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.server.ResponseStatusException;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.List;

@Service
public class ArchitecturalPlanService {

    private final ArchitecturalPlanRepository repository;

    public ArchitecturalPlanService(ArchitecturalPlanRepository repository) {
        this.repository = repository;
    }

    public List<ArchitecturalPlan> getAllPlans() {
        return repository.findAll();
    }

    public ArchitecturalPlan createPlan(String title, String description, MultipartFile image) {
        ArchitecturalPlan plan = new ArchitecturalPlan();
        plan.setTitle(title.trim());
        plan.setDescription(description.trim());

        try {
            String uploadDir = "uploads/";
            Path uploadPath = Paths.get(uploadDir);
            if (!Files.exists(uploadPath)) {
                Files.createDirectories(uploadPath);
            }

            if (image != null && !image.isEmpty()) {
                String imageFileName = System.currentTimeMillis() + "_" + image.getOriginalFilename();
                Path imagePath = uploadPath.resolve(imageFileName);
                Files.copy(image.getInputStream(), imagePath, StandardCopyOption.REPLACE_EXISTING);
                plan.setImageUrl("/uploads/" + imageFileName);
            } else {
                throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Image is required");
            }

        } catch (IOException e) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Failed to upload image", e);
        }

        return repository.save(plan);
    }

    public void deletePlan(Long id) {
        if (!repository.existsById(id)) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Plan not found");
        }
        repository.deleteById(id);
    }
}
