package app.service.impl;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.google.auth.Credentials;
import com.google.auth.oauth2.GoogleCredentials;
import com.google.cloud.storage.BlobId;
import com.google.cloud.storage.BlobInfo;
import com.google.cloud.storage.Storage;
import com.google.cloud.storage.StorageOptions;

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

    private String uploadFile(File file, String fileName) throws Exception {
        BlobId blobId = BlobId.of("carrentsg-30cbe.appspot.com", fileName); // Replace with your bucker name
        BlobInfo blobInfo = BlobInfo.newBuilder(blobId).setContentType("media").build();
        InputStream inputStream = FileService.class.getClassLoader().getResourceAsStream("firebase-private-key.json");
        Credentials credentials = GoogleCredentials.fromStream(inputStream);
        Storage storage = StorageOptions.newBuilder().setCredentials(credentials).build().getService();
        storage.create(blobInfo, Files.readAllBytes(file.toPath()));

        String DOWNLOAD_URL = "https://firebasestorage.googleapis.com/v0/b/carrentsg-30cbe.appspot.com/o/%s?alt=media";
        return String.format(DOWNLOAD_URL, URLEncoder.encode(fileName, StandardCharsets.UTF_8));
    }

    private File convertToFile(MultipartFile multipartFile, String fileName) throws Exception {
        File tempFile = new File(fileName);
        try (FileOutputStream fos = new FileOutputStream(tempFile)) {
            fos.write(multipartFile.getBytes());
            fos.close();
        }
        return tempFile;
    }

    private String getExtension(String fileName) {
        return fileName.substring(fileName.lastIndexOf("."));
    }

    public String upload(MultipartFile multipartFile) {
        try {
            // to get original file name
            String fileName = multipartFile.getOriginalFilename();

            // to generated random string values for file name.
            fileName = UUID.randomUUID().toString().concat(this.getExtension(fileName));

            File file = this.convertToFile(multipartFile, fileName); // to convert multipartFile to File
            String URL = this.uploadFile(file, fileName); // to get uploaded file link
            file.delete();
            return URL;
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }
}
