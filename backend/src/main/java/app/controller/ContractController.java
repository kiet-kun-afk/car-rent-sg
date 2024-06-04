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
@PreAuthorize("isAuthenticated()")
public class ContractController {

    private final ContractService contractService;

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
}
