package com.buildright.service;

import com.buildright.dto.ProjectRequest;
import com.buildright.entity.Project;
import com.buildright.repository.ProjectRepository;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@Service
public class ProjectService {

    private final ProjectRepository projectRepository;

    public ProjectService(ProjectRepository projectRepository) {
        this.projectRepository = projectRepository;
    }

    public Project createProject(ProjectRequest request) {
        Project project = new Project();
        project.setTitle(request.getTitle().trim());
        project.setDescription(request.getDescription().trim());
        project.setLocation(request.getLocation().trim());
        project.setDate(request.getDate().trim());

        try {
            String uploadDir = "uploads/";
            java.nio.file.Path uploadPath = java.nio.file.Paths.get(uploadDir);
            if (!java.nio.file.Files.exists(uploadPath)) {
                java.nio.file.Files.createDirectories(uploadPath);
            }

            if (request.getImage() != null && !request.getImage().isEmpty()) {
                String imageFileName = System.currentTimeMillis() + "_" + request.getImage().getOriginalFilename();
                java.nio.file.Path imagePath = uploadPath.resolve(imageFileName);
                java.nio.file.Files.copy(request.getImage().getInputStream(), imagePath, java.nio.file.StandardCopyOption.REPLACE_EXISTING);
                project.setImageUrl("/uploads/" + imageFileName);
            }

            if (request.getPdf() != null && !request.getPdf().isEmpty()) {
                String pdfFileName = System.currentTimeMillis() + "_" + request.getPdf().getOriginalFilename();
                java.nio.file.Path pdfPath = uploadPath.resolve(pdfFileName);
                java.nio.file.Files.copy(request.getPdf().getInputStream(), pdfPath, java.nio.file.StandardCopyOption.REPLACE_EXISTING);
                project.setPdfUrl("/uploads/" + pdfFileName);
            }
        } catch (java.io.IOException e) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Failed to store files", e);
        }
        return projectRepository.save(project);
    }

    public List<Project> getAllProjects() {
        return projectRepository.findAll();
    }

    public Project getProjectById(Long id) {
        return projectRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Project not found"));
    }

    public void deleteProject(Long id) {
        if (!projectRepository.existsById(id)) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Project not found");
        }
        projectRepository.deleteById(id);
    }
}
