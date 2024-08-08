package app.request;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class PaymentRequest {
    private Long amount;
    private String orderId;
    private String requestId;
    private String returnUrl;
    private String notifyUrl;
}
