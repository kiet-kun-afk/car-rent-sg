package app.dto;

import java.time.LocalDate;

import jakarta.validation.constraints.*;
import lombok.*;

@Getter
@Setter
public class CustomerInformationRequest {

    @NotBlank(message = "Full name is required")
    private String fullName;

    @Past(message = "Birth date is in the past")
    private LocalDate birthDate;

    @NotNull(message = "Gender is required")
    private Boolean gender;
}
