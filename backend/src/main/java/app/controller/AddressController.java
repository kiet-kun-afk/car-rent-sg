package app.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import app.dto.AddressDTO;
import app.response.AddressResponse;
import app.response.ResponseObject;
import app.service.AddressService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("${api.prefix}/address")
@RequiredArgsConstructor
@CrossOrigin
public class AddressController {

    public final AddressService addressService;

    @GetMapping("")
    public ResponseEntity<ResponseObject> getAll() {
        try {
            List<AddressResponse> addresses = addressService.getALL();
            return ResponseEntity.ok(ResponseObject.builder()
                    .status(200)
                    .data(addresses)
                    .build());
        } catch (Exception e) {

            return ResponseEntity.badRequest().body(ResponseObject.builder()
                    .status(400)
                    .message("Get all address failed")
                    .data(e.getMessage())
                    .build());
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<ResponseObject> getOne(@PathVariable Integer id) {
        try {
            AddressResponse addresses = addressService.getOne(id);
            return ResponseEntity.ok(ResponseObject.builder()
                    .status(200)
                    .data(addresses)
                    .build());
        } catch (Exception e) {

            return ResponseEntity.badRequest().body(ResponseObject.builder()
                    .status(400)
                    .message("Can not found address")
                    .data(e.getMessage())
                    .build());
        }

    }

    @PostMapping("")
    public ResponseEntity<ResponseObject> Post(@RequestBody AddressDTO addressDTO) {
        try {
            AddressResponse addressResponse = addressService.Post(addressDTO);
            return ResponseEntity.ok(ResponseObject.builder()
                    .status(200)
                    .message("Get all car successfully")
                    .data(addressResponse)
                    .build());
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(ResponseObject.builder()
                    .status(400)
                    .message("Get all car failed")
                    .data(e.getMessage())
                    .build());
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<ResponseObject> Put(@PathVariable Integer id, @RequestBody AddressDTO addressDTO) {
        try {
            AddressResponse addressResponse = addressService.Put(id, addressDTO);
            return ResponseEntity.ok(ResponseObject.builder()
                    .status(200)
                    .message("Get all car successfully")
                    .data(addressResponse)
                    .build());
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(ResponseObject.builder()
                    .status(400)
                    .message("Get all car failed")
                    .data(e.getMessage())
                    .build());
        }

    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ResponseObject> Delete(@PathVariable("id") Integer id) {
        try {
            addressService.Delete(id);
            return ResponseEntity.ok(ResponseObject.builder()
                    .status(200)
                    .build());
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(ResponseObject.builder()
                    .status(400)
                    .message("Get all car failed")
                    .data(e.getMessage())
                    .build());
        }
    }

    @PreAuthorize("isAuthenticated")
    @PutMapping("/update-customer-address")
    public ResponseEntity<ResponseObject> updateCustomerAddress(@Valid @ModelAttribute AddressDTO addressDTO,
            BindingResult result) {
        if (result.hasErrors()) {
            List<String> errors = result.getFieldErrors().stream().map(FieldError::getDefaultMessage).toList();
            return ResponseEntity.badRequest().body(ResponseObject.builder()
                    .status(400)
                    .message("Update address failed, validation")
                    .data(errors)
                    .build());
        }
        try {
            AddressResponse addressResponse = addressService.updateCustomerAddress(addressDTO);
            return ResponseEntity.ok(ResponseObject.builder()
                    .status(200)
                    .message("Update address successfully")
                    .data(addressResponse)
                    .build());
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(ResponseObject.builder()
                    .status(400)
                    .message("Update address failed")
                    .data(e.getMessage())
                    .build());
        }
    }

    @PreAuthorize("isAuthenticated")
    @GetMapping("/get-customer-address")
    public ResponseEntity<ResponseObject> getCustomerAddress() {
        try {
            AddressResponse addressResponse = addressService.getCustomerAddress();
            return ResponseEntity.ok(ResponseObject.builder()
                    .status(200)
                    .message("Get address successfully")
                    .data(addressResponse)
                    .build());
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(ResponseObject.builder()
                    .status(400)
                    .message("Get address failed")
                    .data(e.getMessage())
                    .build());
        }
    }
}
