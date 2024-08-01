package app.dto.record;

import org.springframework.web.multipart.MultipartFile;

import app.dto.RecordDTO;
import lombok.*;

@Getter
@Setter
public class DeliveryDTO extends RecordDTO {

    private MultipartFile registrationDocument;

    private MultipartFile insuranceDocument;

    private MultipartFile certificateOfRegistration;
}
