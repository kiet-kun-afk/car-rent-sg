package app.dto;

import java.time.LocalDate;

import org.springframework.web.multipart.MultipartFile;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class CitizenCardDTO {

    @NotNull(message = "id card is not null")
    private String idCard;

    // can't upload file
    @NotBlank
    private MultipartFile frontImage;

    @NotBlank
    private MultipartFile backImage;

    private LocalDate expiryDate;

    private LocalDate issueDate;
}
