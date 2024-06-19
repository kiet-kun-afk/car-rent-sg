package app.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.annotation.*;

import app.dto.BillDTO;
import app.response.BillResponse;
import app.response.ResponseObject;
import app.service.BillService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("${api.prefix}/bills")
@RequiredArgsConstructor
public class BillsController {

    private final BillService billService;

    @GetMapping("")
    public ResponseEntity<ResponseObject> getAll() {
        try {
            List<BillResponse> billResponse = billService.getAll();
            return ResponseEntity.ok(ResponseObject.builder()
                    .status(200)
                    .message("Get all car successfully")
                    .data(billResponse)
                    .build());
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(ResponseObject.builder()
                    .status(400)
                    .message("Get all car failed")
                    .data(e.getMessage())
                    .build());
        }
    }

    @PostMapping("/create-deposit-bill/{contractId}")
    public ResponseEntity<ResponseObject> createDepositBill(@Valid @ModelAttribute BillDTO billDTO,
            @PathVariable Integer contractId,
            BindingResult bindingResult) {
        if (bindingResult.hasErrors()) {
            List<String> errors = bindingResult.getFieldErrors().stream().map(FieldError::getDefaultMessage).toList();
            return ResponseEntity.badRequest().body(ResponseObject.builder()
                    .status(400)
                    .message("Create deposit bill failed, validation")
                    .data(errors)
                    .build());
        }
        try {
            // BillResponse billResponse
            return ResponseEntity.ok(ResponseObject.builder()
                    .status(200)
                    .message("Create deposit bill successfully")
                    // .data(billResponse)
                    .build());
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(ResponseObject.builder()
                    .status(400)
                    .message("Create deposit bill failed")
                    .data(e.getMessage())
                    .build());
        }
    }

    @PostMapping("/complete-deposit/{billId}")
    public ResponseEntity<ResponseObject> completeDepositBill(@PathVariable Integer billId, @RequestParam Double cost) {
        try {
            BillResponse billResponse = billService.completeDepositBill(billId, cost);
            return ResponseEntity.ok(ResponseObject.builder()
                    .status(200)
                    .message("Complete deposit bill successfully")
                    .data(billResponse)
                    .build());
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(ResponseObject.builder()
                    .status(400)
                    .message("Complete deposit bill failed")
                    .data(e.getMessage())
                    .build());
        }
    }
}
