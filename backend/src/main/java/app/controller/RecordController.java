package app.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.annotation.*;

import app.dto.record.DeliveryDTO;
import app.dto.record.ReturnDTO;
import app.response.RecordResponse;
import app.response.ResponseObject;
import app.service.RecordService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("${api.prefix}/records")
@RequiredArgsConstructor
public class RecordController {

    private final RecordService recordService;

    // @PreAuthorize("hasAnyAuthority('ADMIN_ROLE', 'STAFF_ROLE')")
    @PostMapping("/create-delivery-record/{contractId}")
    public ResponseEntity<ResponseObject> createDeliveryRecord(@PathVariable Integer contractId,
            @Valid @ModelAttribute DeliveryDTO recordDTO,
            BindingResult bindingResult) {
        if (bindingResult.hasErrors()) {
            List<String> errors = bindingResult.getFieldErrors().stream().map(FieldError::getDefaultMessage).toList();
            return ResponseEntity.badRequest().body(ResponseObject.builder()
                    .status(400)
                    .message("Create delivery record failed, validation")
                    .data(errors)
                    .build());
        }
        try {
            RecordResponse recordResponse = recordService.createDeliveryRecord(contractId, recordDTO);
            return ResponseEntity.ok(ResponseObject.builder()
                    .status(200)
                    .message("Create delivery record successfully")
                    .data(recordResponse)
                    .build());
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(ResponseObject.builder()
                    .status(400)
                    .message("Create delivery record failed")
                    .data(e.getMessage())
                    .build());
        }
    }

    // @PreAuthorize("hasAnyAuthority('ADMIN_ROLE', 'STAFF_ROLE')")
    @PostMapping("/create-return-record/{deliveryRecordId}")
    public ResponseEntity<ResponseObject> createReturnRecord(@PathVariable Integer deliveryRecordId,
            @Valid @ModelAttribute ReturnDTO recordDTO,
            BindingResult bindingResult) {
        if (bindingResult.hasErrors()) {
            List<String> errors = bindingResult.getFieldErrors().stream().map(FieldError::getDefaultMessage).toList();
            return ResponseEntity.badRequest().body(ResponseObject.builder()
                    .status(400)
                    .message("Create return record failed, validation")
                    .data(errors)
                    .build());
        }
        try {
            RecordResponse recordResponse = recordService.createReturnRecord(deliveryRecordId, recordDTO);
            return ResponseEntity.ok(ResponseObject.builder()
                    .status(200)
                    .message("Create return record successfully")
                    .data(recordResponse)
                    .build());
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(ResponseObject.builder()
                    .status(400)
                    .message("Create return record failed")
                    .data(e.getMessage())
                    .build());
        }
    }

    @PreAuthorize("hasAnyAuthority('ADMIN_ROLE', 'STAFF_ROLE')")
    @GetMapping("/list-delivery-record-not-return-yet")
    public ResponseEntity<ResponseObject> getAllDeliveryRecord() {
        try {
            List<RecordResponse> recordResponses = recordService.getListDeliveryNotReturnYet();
            return ResponseEntity.ok(ResponseObject.builder()
                    .status(200)
                    .message("Get all delivery record successfully")
                    .data(recordResponses)
                    .build());
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(ResponseObject.builder()
                    .status(400)
                    .message("Get all delivery record failed")
                    .data(e.getMessage())
                    .build());
        }
    }

    @PreAuthorize("hasAnyAuthority('ADMIN_ROLE', 'STAFF_ROLE')")
    @GetMapping("/list-return-record")
    public ResponseEntity<ResponseObject> getAllReturnRecord() {
        try {
            List<RecordResponse> recordResponses = recordService.getListReturnRecord();
            return ResponseEntity.ok(ResponseObject.builder()
                    .status(200)
                    .message("Get all return record successfully")
                    .data(recordResponses)
                    .build());
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(ResponseObject.builder()
                    .status(400)
                    .message("Get all return record failed")
                    .data(e.getMessage())
                    .build());
        }
    }
}
