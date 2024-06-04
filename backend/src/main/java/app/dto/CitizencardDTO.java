package app.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class CitizencardDTO {

    @NotNull(message = "id card is not null")
    private Integer idCard;

    @NotBlank
    private String frontImage;

    @NotBlank
    private String backImage;
}
