package app.dto;

import org.springframework.web.multipart.MultipartFile;

import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class CustomerDTO {

    // private String firstName;

    // private String lastName;

    private String fullName;

    private Boolean gender;

    @NotBlank(message = "Phone number is required")
    private String phoneNumber;

    private String birthDateStr;

    @NotBlank(message = "Email is required")
    private String email;

    private Boolean status;

    private MultipartFile avatarImageFile;
}
