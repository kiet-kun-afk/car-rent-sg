package app.dto;

import java.time.LocalDateTime;

import org.springframework.web.multipart.MultipartFile;

import jakarta.validation.constraints.Future;
import jakarta.validation.constraints.NotBlank;
import lombok.*;

@Setter
@Getter
public class ContractDTO {

    private Integer contractId;

    @Future(message = "Star date must be future date")
    private LocalDateTime startDate;

    @Future(message = "End date must be future date")
    private LocalDateTime endDate;

    private long deposit = 0;

    @NotBlank(message = "Way to pay is required")
    private String wayToPay;

    private MultipartFile file;
}
