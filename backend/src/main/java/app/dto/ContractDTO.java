package app.dto;

import java.time.LocalDate;

import org.springframework.web.multipart.MultipartFile;

import jakarta.validation.constraints.Future;
import jakarta.validation.constraints.NotBlank;
import lombok.*;

@Setter
@Getter
public class ContractDTO {

    private Integer contractId;

    @Future(message = "Star date must be future date")
    private LocalDate startDate;

    @Future(message = "End date must be future date")
    private LocalDate endDate;

    private Double deposit = 0.0;

    @NotBlank(message = "Way to pay is required")
    private String wayToPay;

    private MultipartFile file;
}
