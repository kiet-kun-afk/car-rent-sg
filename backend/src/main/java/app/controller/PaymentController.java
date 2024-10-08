package app.controller;

import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.TimeZone;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.mservice.config.Environment;
import com.mservice.enums.RequestType;
import com.mservice.models.PaymentResponse;
import com.mservice.processor.CreateOrderMoMo;
import com.mservice.shared.utils.LogUtils;

import app.config.PaymentVNPAYConfig;
import app.response.ContractResponse;
import app.response.ResponseObject;
import app.service.ContractService;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("${api.prefix}/payments")
@RequiredArgsConstructor
@CrossOrigin(origins = "${url.customer}")
public class PaymentController {

    @Value("${url.customer}")
    private String urlCustomer;

    @Value("${url.staff}")
    private String urlStaff;
    private final ContractService contractService;
    private static final Logger LOGGER = LoggerFactory.getLogger(PaymentController.class);

    private String wayToPay;

    /* Index Payment funtion */
    @GetMapping("/{contractId}")
    public ResponseEntity<ResponseObject> index(@PathVariable("contractId") Integer contractId) {
        try {
            ContractResponse contractResponses = contractService.findByContractId(contractId);
            return ResponseEntity.ok(ResponseObject.builder().status(200).message("Get contract successfully")
                    .data(contractResponses).build());
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(
                    ResponseObject.builder().status(400).message("Get contract failed").data(e.getMessage()).build());
        }
    }

    /* Pay with MOMO */
    @PostMapping("/momo/{id}")
    public ResponseEntity<Map<String, String>> createMoMoOrder(@PathVariable Integer id,
            @RequestParam("amount") long amount, @RequestParam("type") String type) {
        ContractResponse contractResponses = contractService.findByContractId(id);
        // contractService.UpdateStatusPayment(contractId, true);
        wayToPay = "Chuyển khoản MOMO";
        try {
            contractService.completePayContract(id, amount, wayToPay, type);
        } catch (Exception e) {
            LOGGER.error("Thanh toán tiền cọc thất bại", e);
        }
        LogUtils.init();
        String requestId = String.valueOf(System.currentTimeMillis());
        String orderId = String.valueOf(System.currentTimeMillis());
        LOGGER.info("Amount: " + amount);
        String orderInfo = contractResponses.getCarName() + contractResponses.getRentCost();
        String returnURL = urlCustomer + "/user/paymentsuccessMomo";
        String notifyURL = "https://google.com.vn";

        Environment environment = Environment.selectEnv("dev");
        PaymentResponse captureWalletMoMoResponse = null;
        try {
            captureWalletMoMoResponse = CreateOrderMoMo.process(environment, orderId, requestId,
                    Long.toString(amount), orderInfo, returnURL, notifyURL, "", RequestType.PAY_WITH_ATM, null);
        } catch (Exception e) {
            LOGGER.error("Error while processing MoMo payment", e);
        }

        Map<String, String> response = new HashMap<>();
        if (captureWalletMoMoResponse != null && captureWalletMoMoResponse.getPayUrl() != null) {

            LOGGER.info("Pay URL: " + captureWalletMoMoResponse.getPayUrl());
            response.put("status", "OK");
            response.put("message", "Thanh toán thành công");
            response.put("paymentUrl", captureWalletMoMoResponse.getPayUrl());
        } else {
            response.put("status", "FAILED");
            response.put("message", "Thanh toán thất bại");
        }

        return ResponseEntity.ok(response);
    }

    /* Pay with VNPAY */
    @PostMapping("/vnpay/{id}")
    public ResponseEntity<Map<String, String>> createVnpayOrder(@PathVariable Integer id,
            @RequestParam("amount") long amount, @RequestParam("type") String type)
            throws Exception {
        wayToPay = "Chuyển khoản VNPAY";
        try {
            contractService.completePayContract(id, amount, wayToPay, type);
        } catch (Exception e) {
            LOGGER.error("Thanh toán tiền cọc thất bại", e);
        }
        String vnp_Version = "2.1.0";
        String vnp_Command = "pay";
        String orderType = "other";
        String bankCode = "NCB";

        String vnp_TxnRef = PaymentVNPAYConfig.getRandomNumber(8);
        String vnp_IpAddr = "127.0.0.1";

        String vnp_TmnCode = PaymentVNPAYConfig.vnp_TmnCode;

        Map<String, String> vnp_Params = new HashMap<>();
        vnp_Params.put("vnp_Version", vnp_Version);
        vnp_Params.put("vnp_Command", vnp_Command);
        vnp_Params.put("vnp_TmnCode", vnp_TmnCode);
        vnp_Params.put("vnp_Amount", String.valueOf(amount * 100));
        vnp_Params.put("vnp_CurrCode", "VND");
        vnp_Params.put("vnp_Locale", "vn");
        vnp_Params.put("vnp_BankCode", bankCode);
        vnp_Params.put("vnp_TxnRef", vnp_TxnRef);
        vnp_Params.put("vnp_OrderInfo", "Thanh toán đơn hàng:" + vnp_TxnRef);
        vnp_Params.put("vnp_OrderType", orderType);
        vnp_Params.put("vnp_ReturnUrl", PaymentVNPAYConfig.vnp_ReturnUrl);
        vnp_Params.put("vnp_IpAddr", vnp_IpAddr);

        Calendar cld = Calendar.getInstance(TimeZone.getTimeZone("Etc/GMT+7"));
        SimpleDateFormat formatter = new SimpleDateFormat("yyyyMMddHHmmss");
        String vnp_CreateDate = formatter.format(cld.getTime());
        vnp_Params.put("vnp_CreateDate", vnp_CreateDate);

        cld.add(Calendar.MINUTE, 15);
        String vnp_ExpireDate = formatter.format(cld.getTime());
        vnp_Params.put("vnp_ExpireDate", vnp_ExpireDate);

        List<String> fieldNames = new ArrayList<>(vnp_Params.keySet());
        Collections.sort(fieldNames);
        StringBuilder hashData = new StringBuilder();
        StringBuilder query = new StringBuilder();
        for (String fieldName : fieldNames) {
            String fieldValue = vnp_Params.get(fieldName);
            if (fieldValue != null && fieldValue.length() > 0) {
                hashData.append(fieldName).append('=')
                        .append(URLEncoder.encode(fieldValue, StandardCharsets.US_ASCII.toString()));
                query.append(URLEncoder.encode(fieldName, StandardCharsets.US_ASCII.toString()))
                        .append('=').append(URLEncoder.encode(fieldValue, StandardCharsets.US_ASCII.toString()));
                if (!fieldName.equals(fieldNames.get(fieldNames.size() - 1))) {
                    query.append('&');
                    hashData.append('&');
                }
            }
        }
        String queryUrl = query.toString();
        String vnp_SecureHash = PaymentVNPAYConfig.hmacSHA512(PaymentVNPAYConfig.secretKey, hashData.toString());
        queryUrl += "&vnp_SecureHash=" + vnp_SecureHash;
        String paymentUrl = PaymentVNPAYConfig.vnp_PayUrl + "?" + queryUrl;

        Map<String, String> response = new HashMap<>();
        response.put("status", "OK");
        response.put("message", "Thanh toán thành công");
        response.put("paymentUrl", paymentUrl);
        return ResponseEntity.ok(response);
    }

}
