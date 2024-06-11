package app.dto;

import jakarta.validation.constraints.*;
import lombok.*;

@Setter
@Getter
public class RecordDTO {

    @Positive(message = "Kilometer number is positive")
    @NotNull(message = "Kilometer number is required")
    private Integer kilometerNumber;

    @Positive(message = "Fuel number is positive")
    @NotNull(message = "Fuel number is required")
    private Integer fuelNumber;

    private Boolean status;
}
