package app.dto;

import org.springframework.web.multipart.MultipartFile;

import jakarta.validation.constraints.NotBlank;
import lombok.*;

@Setter
@Getter
public class ContractDTO {

    @NotBlank(message = "Create date is required")
    private String createDate;

    @NotBlank(message = "Start date is required")
    private String startDate;

    @NotBlank(message = "End date is required")
    private String endDate;

    private Double deposit = 0.0;

    @NotBlank(message = "Way to pay is required")
    private String wayToPay;

    private MultipartFile file;
}
