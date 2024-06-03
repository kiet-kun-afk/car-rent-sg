package app.dto.login;

import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class LoginDTO {

    @NotBlank(message = "Username is required")
    private String emailOrPhoneNumber;

    @NotBlank(message = "Password is required")
    private String password;
}
