package app.dto;

import org.springframework.web.multipart.MultipartFile;

import jakarta.validation.constraints.NotBlank;
import lombok.*;

@Setter
@Getter
public class CardDTO {

    @NotBlank
    private String idCard;

    private MultipartFile frontImage;

    private MultipartFile backImage;
}
