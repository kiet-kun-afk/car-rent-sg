package app.dto.login;

import jakarta.validation.constraints.NotBlank;
import lombok.*;

@Setter
@Getter
public class ChangePasswordDTO {

    @NotBlank(message = "Password is required")
    private String oldPassword;

    @NotBlank(message = "New password is required")
    private String newPassword;

    @NotBlank(message = "Confirm new password is required")
    private String confirmNewPassword;
}
