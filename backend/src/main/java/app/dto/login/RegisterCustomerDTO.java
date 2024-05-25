package app.dto.login;

import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class RegisterCustomerDTO {
    private String email;

    @JsonProperty("phone_number")
    private String phoneNumber;

    private String password;

    @JsonProperty("re_password")
    private String rePassword;
}
