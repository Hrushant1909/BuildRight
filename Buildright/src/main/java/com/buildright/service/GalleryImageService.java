package com.buildright.service;

import com.buildright.entity.GalleryImage;
import com.buildright.repository.GalleryImageRepository;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.server.ResponseStatusException;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.ArrayList;
import java.util.List;

@Service
public class GalleryImageService {

    private final GalleryImageRepository repository;

    public GalleryImageService(GalleryImageRepository repository) {
        this.repository = repository;
    }

    public List<GalleryImage> getAllImages() {
        return repository.findAll();
    }

    public List<GalleryImage> uploadImages(List<MultipartFile> files) {
        List<GalleryImage> savedImages = new ArrayList<>();
        
        try {
            String uploadDir = "uploads/";
            Path uploadPath = Paths.get(uploadDir);
            if (!Files.exists(uploadPath)) {
                Files.createDirectories(uploadPath);
            }

            for (MultipartFile file : files) {
                if (file != null && !file.isEmpty()) {
                    String fileName = System.currentTimeMillis() + "_" + file.getOriginalFilename();
                    Path filePath = uploadPath.resolve(fileName);
                    Files.copy(file.getInputStream(), filePath, StandardCopyOption.REPLACE_EXISTING);
                    
                    GalleryImage image = new GalleryImage();
                    image.setImageUrl("/uploads/" + fileName);
                    savedImages.add(repository.save(image));
                }
            }

        } catch (IOException e) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Failed to upload images", e);
        }

        return savedImages;
    }

    public void deleteImage(Long id) {
        if (!repository.existsById(id)) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Image not found");
        }
        repository.deleteById(id);
    }
}
