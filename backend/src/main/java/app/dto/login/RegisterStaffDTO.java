package app.dto.login;

import java.util.Set;

import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class RegisterStaffDTO {

    private String email;

    @JsonProperty("phone_number")
    private String phoneNumber;

    Set<String> roles;
}
