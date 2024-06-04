package app.dto;

import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class BrandDTO {
    // private Integer brandId;

    @NotNull(message = "Brand name cannot be null")
    private String brandName;

    private String brandImage;

    @NotNull(message = "Country of origin cannot be null")
    private String countryOrigin;
}
