package app.dto.login;

import java.time.LocalDate;
import java.util.Set;

import org.springframework.web.multipart.MultipartFile;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class RegisterStaffDTO {

    @NotBlank(message = "Email is required")
    @Email
    private String email;

    @NotBlank(message = "Phone number is required")
    private String phoneNumber;

    Set<String> roles;

    private MultipartFile avatar_img;

    private LocalDate birthday;

    private String fullname;

    private boolean gender;

}
