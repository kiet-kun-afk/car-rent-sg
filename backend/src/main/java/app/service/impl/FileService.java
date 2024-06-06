package app.service.impl;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class FileService {

    public List<String> saveImages(List<MultipartFile> images) throws Exception {
        if (images == null || images.isEmpty()) {
            return null;
        }
        List<String> imagePaths = new ArrayList<>();

        for (MultipartFile image : images) {

            if (!isImageFile(image) || image.getOriginalFilename() == null) {
                throw new IOException("Invalid image format");
            }

            String directory = "images/";
            String fileName = UUID.randomUUID().toString() + "_" + image.getOriginalFilename();
            Path filePath = Paths.get(directory, fileName);
            Files.createDirectories(filePath.getParent());
            Files.write(filePath, image.getBytes());
            imagePaths.add(fileName);
        }
        return imagePaths;
    }

    public String saveImage(MultipartFile image) throws Exception {
        if (image == null || image.isEmpty()) {
            return null;
        }
        if (!isImageFile(image) || image.getOriginalFilename() == null) {
            throw new IOException("Invalid image format");
        }

        String directory = "image/";
        String fileName = UUID.randomUUID().toString() + "_" + image.getOriginalFilename();
        Path filePath = Paths.get(directory, fileName);
        Files.createDirectories(filePath.getParent());
        Files.write(filePath, image.getBytes());
        return fileName;
    }

    private boolean isImageFile(MultipartFile file) {
        String contentType = file.getContentType();
        return contentType != null && contentType.startsWith("image/");
    }

    public String saveAttachment(MultipartFile attachment) throws Exception {
        if (attachment == null) {
            return "Empty attachment";
        }

        String directory = "attachments/";
        String fileName = UUID.randomUUID().toString() + "_" + attachment.getOriginalFilename();
        Path filePath = Paths.get(directory, fileName);
        Files.createDirectories(filePath.getParent());
        Files.write(filePath, attachment.getBytes());

        return fileName;
    }

}
