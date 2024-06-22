package app.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Positive;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class BillDTO {

    @Positive(message = "Cost must is positive")
    private Double payCost;

    @NotBlank(message = "Method is required")
    private String paymentMethod;

    @NotBlank(message = "Content is required")
    private String describe;

}
