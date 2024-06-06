package app.dto;

import java.time.LocalDate;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class BillDTO {
    private LocalDate payDate;

    private Double payCost;

    private Double incurredCost;

    private String describe;

    private Integer contractId;

    private Integer staffId;

}
