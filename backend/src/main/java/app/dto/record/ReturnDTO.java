package app.dto.record;

import app.dto.RecordDTO;
import lombok.*;

@Getter
@Setter
public class ReturnDTO extends RecordDTO {

    private Double surcharges;

    private Double surcharges2;

    private Boolean paymentStatus;
}
