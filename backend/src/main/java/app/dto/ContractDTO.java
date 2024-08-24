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

    @Future(message = "Ngày bắt đầu phải lớn hơn ngày hiện tại và bé hơn ngày trả xe")
    private LocalDateTime startDate;

    @Future(message = "Ngày trả xe phải lớn hơn ngày bắt đầu")
    private LocalDateTime endDate;

    private long deposit = 0;

    @NotBlank(message = "Way to pay is required")
    private String wayToPay;

    private MultipartFile file;
}
