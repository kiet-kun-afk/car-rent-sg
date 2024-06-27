package app.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.annotation.*;

import app.dto.CardDTO;
import app.model.cards.DriverLicense;
import app.response.ResponseObject;
import app.service.DriverLicenseService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("${api.prefix}/driver-licenses")
@RequiredArgsConstructor
public class DriverLicenseController {

    private final DriverLicenseService driverLicenseService;

    @PreAuthorize("isAuthenticated()")
    @PostMapping("/assign-license")
    public ResponseEntity<ResponseObject> assignLicense(@Valid @ModelAttribute CardDTO cardDTO,
            BindingResult result) {
        if (result.hasErrors()) {
            List<String> errors = result.getFieldErrors().stream().map(FieldError::getDefaultMessage).toList();
            return ResponseEntity.badRequest().body(ResponseObject.builder()
                    .status(400)
                    .message("Assign license failed, validation")
                    .data(errors)
                    .build());
        }
        try {
            DriverLicense driverLicense = driverLicenseService.assignWithCustomer(cardDTO);
            return ResponseEntity.ok(ResponseObject.builder()
                    .status(200)
                    .message("Assign license successfully")
                    .data(driverLicense)
                    .build());
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(ResponseObject.builder()
                    .status(400)
                    .message("Assign license failed")
                    .data(e.getMessage())
                    .build());
        }
    }

    @PreAuthorize("isAuthenticated()")
    @GetMapping("/get-driver-license/{idCard}")
    public ResponseEntity<ResponseObject> getDriverLicense(@PathVariable String idCard) {
        try {
            DriverLicense driverLicense = driverLicenseService.getDriverLicense(idCard);
            return ResponseEntity.ok(ResponseObject.builder()
                    .status(200)
                    .message("Get driver license successfully")
                    .data(driverLicense)
                    .build());
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(ResponseObject.builder()
                    .status(400)
                    .message("Get driver license failed")
                    .data(e.getMessage())
                    .build());
        }
    }
}
