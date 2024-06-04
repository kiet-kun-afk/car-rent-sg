package app.dto.login;

import com.fasterxml.jackson.annotation.JsonProperty;

import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class LoginDTO {

    @JsonProperty("email_or_phone_number")
    private String emailOrPhoneNumber;

    @NotBlank
    private String password;
}
