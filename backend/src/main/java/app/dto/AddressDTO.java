package app.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

/**
 * AddressDTO
 * Version: 1.0
 * Date: 5/24/2024
 * Modification Logs
 * DATE AUTHOR DESCRIPTION
 * -------------------------------------
 * 5/24/2024 kiet-kun-afk Create
 */
@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class AddressDTO {

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

    private String rememberName;
}
