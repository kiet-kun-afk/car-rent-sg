package app.dto.login;

import java.time.LocalDate;

import org.springframework.web.multipart.MultipartFile;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
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

    @NotNull(message = "Hình đại diện không được để trống")
    private MultipartFile avatarImg;

    private LocalDate birthday;

    private String fullname;

    private boolean gender;

    @NotBlank(message = "Province is not blank")
    @Size(min = 2, max = 40, message = "Province must be between 2 to 40 characters")
    private String province;

    @NotBlank(message = "District is not blank")
    @Size(min = 2, max = 40, message = "District must be between 2 to 40 characters")
    private String district;

    @NotBlank(message = "Ward is not blank")
    @Size(min = 2, max = 40, message = "Ward must be between 2 to 40 characters")
    private String ward;

    @NotBlank(message = "Street is not blank")
    @Size(min = 2, max = 40, message = "Street must be between 2 to 40 characters")
    private String street;

    @NotNull(message = "Front side is required")
    private MultipartFile frontSide;

    @NotNull(message = "Mặt sau căn cước không được để trống")
    private MultipartFile backSide;

    @NotBlank(message = "Số căn cước không được để trống")
    private String idCard;

    private LocalDate issueDate;

    private LocalDate expiryDate;

}
