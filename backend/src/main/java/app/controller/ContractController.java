package app.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.annotation.*;

import app.dto.ContractDTO;
import app.response.ContractResponse;
import app.response.ResponseObject;
import app.service.ContractService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("${api.prefix}/contracts")
@RequiredArgsConstructor
public class ContractController {

    private final ContractService contractService;

    @PreAuthorize("isAuthenticated()")
    @PostMapping("/create/{registrationPlate}")
    public ResponseEntity<ResponseObject> createContract(@PathVariable("registrationPlate") String registrationPlate,
            @Valid @ModelAttribute ContractDTO contractDTO, BindingResult bindingResult) {
        if (bindingResult.hasErrors()) {
            List<String> errors = bindingResult.getFieldErrors().stream().map(FieldError::getDefaultMessage).toList();
            return ResponseEntity.badRequest().body(ResponseObject.builder()
                    .status(400)
                    .message("Create contract failed, validation")
                    .data(errors)
                    .build());
        }
        try {
            ContractResponse contractResponse = contractService.createContract(registrationPlate, contractDTO);
            return ResponseEntity.ok(ResponseObject.builder()
                    .status(200)
                    .message("Create contract successfully")
                    .data(contractResponse)
                    .build());
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(ResponseObject.builder()
                    .status(400)
                    .message("Create contract failed")
                    .data(e.getMessage())
                    .build());
        }
    }

    @PreAuthorize("isAuthenticated()")
    @PutMapping("/update/{contractId}")
    public ResponseEntity<ResponseObject> updateContract(@PathVariable("contractId") Integer contractId,
            @Valid @ModelAttribute ContractDTO contractDTO, BindingResult bindingResult) {
        if (bindingResult.hasErrors()) {
            List<String> errors = bindingResult.getFieldErrors().stream().map(FieldError::getDefaultMessage).toList();
            return ResponseEntity.badRequest().body(ResponseObject.builder()
                    .status(400)
                    .message("Update contract failed, validation")
                    .data(errors)
                    .build());
        }
        try {
            ContractResponse contractResponse = contractService.updateContract(contractId, contractDTO);
            return ResponseEntity.ok(ResponseObject.builder()
                    .status(200)
                    .message("Update contract successfully")
                    .data(contractResponse)
                    .build());
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(ResponseObject.builder()
                    .status(400)
                    .message("Update contract failed")
                    .data(e.getMessage())
                    .build());
        }
    }

    @PreAuthorize("hasAnyAuthority('ADMIN_ROLE')")
    @DeleteMapping("/delete/{contractId}")
    public ResponseEntity<ResponseObject> deleteContract(@PathVariable("contractId") Integer contractId) {
        try {
            contractService.deleteContract(contractId);
            return ResponseEntity.ok(ResponseObject.builder()
                    .status(200)
                    .message("Delete contract successfully")
                    .build());
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(ResponseObject.builder()
                    .status(400)
                    .message("Delete contract failed")
                    .data(e.getMessage())
                    .build());
        }
    }

    @PreAuthorize("hasAnyAuthority('ADMIN_ROLE', 'STAFF_ROLE')")
    @PutMapping("/confirm/{contractId}")
    public ResponseEntity<ResponseObject> confirmContract(@PathVariable("contractId") Integer contractId) {
        try {
            contractService.confirmContract(contractId);
            return ResponseEntity.ok(ResponseObject.builder()
                    .status(200)
                    .message("Confirm contract successfully")
                    .build());
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(ResponseObject.builder()
                    .status(400)
                    .message("Confirm contract failed")
                    .data(e.getMessage())
                    .build());
        }
    }

    @PreAuthorize("hasAnyAuthority('ADMIN_ROLE', 'STAFF_ROLE')")
    @PutMapping("/complete/{contractId}")
    public ResponseEntity<ResponseObject> completeContract(@PathVariable("contractId") Integer contractId,
            @RequestParam("deposit") Double deposit) {
        try {
            contractService.completePayContract(contractId, deposit);
            return ResponseEntity.ok(ResponseObject.builder()
                    .status(200)
                    .message("Complete contract successfully")
                    .build());
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(ResponseObject.builder()
                    .status(400)
                    .message("Complete contract failed")
                    .data(e.getMessage())
                    .build());
        }
    }

    @PreAuthorize("hasAnyAuthority('ADMIN_ROLE')")
    @GetMapping("/all")
    public ResponseEntity<ResponseObject> getAllContract() {
        try {
            List<ContractResponse> contractResponses = contractService.getAllContract();
            return ResponseEntity.ok(ResponseObject.builder()
                    .status(200)
                    .message("Get all contract successfully")
                    .data(contractResponses)
                    .build());
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(ResponseObject.builder()
                    .status(400)
                    .message("Get all contract failed")
                    .data(e.getMessage())
                    .build());
        }
    }

    @PreAuthorize("isAuthenticated()")
    @GetMapping("/all-by-customer/{phoneNumber}")
    public ResponseEntity<ResponseObject> getAllContractByCustomer(@PathVariable String phoneNumber) {
        try {
            List<ContractResponse> contractResponses = contractService.getAllContractByCustomer(phoneNumber);
            return ResponseEntity.ok(ResponseObject.builder()
                    .status(200)
                    .message("Get all contract successfully")
                    .data(contractResponses)
                    .build());
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(ResponseObject.builder()
                    .status(400)
                    .message("Get all contract failed")
                    .data(e.getMessage())
                    .build());
        }
    }

    @PreAuthorize("hasAnyAuthority('ADMIN_ROLE', 'STAFF_ROLE')")
    @GetMapping("/all-by-staff/{email}")
    public ResponseEntity<ResponseObject> getAllContractByStaff(@PathVariable String email) {
        try {
            List<ContractResponse> contractResponses = contractService.getAllContractByStaff(email);
            return ResponseEntity.ok(ResponseObject.builder()
                    .status(200)
                    .message("Get all contract successfully")
                    .data(contractResponses)
                    .build());
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(ResponseObject.builder()
                    .status(400)
                    .message("Get all contract failed")
                    .data(e.getMessage())
                    .build());
        }
    }

    @PreAuthorize("hasAnyAuthority('ADMIN_ROLE')")
    @GetMapping("/all-by-car/{registrationPlate}")
    public ResponseEntity<ResponseObject> getAllContractByCar(@PathVariable String registrationPlate) {
        try {
            List<ContractResponse> contractResponses = contractService.getAllContractByCar(registrationPlate);
            return ResponseEntity.ok(ResponseObject.builder()
                    .status(200)
                    .message("Get all contract successfully")
                    .data(contractResponses)
                    .build());
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(ResponseObject.builder()
                    .status(400)
                    .message("Get all contract failed")
                    .data(e.getMessage())
                    .build());
        }
    }
}
