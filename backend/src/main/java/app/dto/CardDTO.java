package app.dto;

import org.springframework.web.multipart.MultipartFile;
import java.time.LocalDate;

import jakarta.validation.constraints.NotBlank;
import lombok.*;

@Setter
@Getter
public class CardDTO {

    @NotBlank(message = "id card not blank")
    private String idCard;

    private MultipartFile frontImage;

    private MultipartFile backImage;

    private LocalDate issueDate;

    private LocalDate expiryDate;

    private String category;
}
