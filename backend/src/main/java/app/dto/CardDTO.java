package app.dto;

import org.springframework.web.multipart.MultipartFile;

import jakarta.validation.constraints.NotBlank;
import lombok.*;

@Setter
@Getter
public class CardDTO {

    @NotBlank(message = "id card not blank")
    private String idCard;

    private MultipartFile frontImage;
}
