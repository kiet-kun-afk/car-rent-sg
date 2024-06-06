package app.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import app.dto.AddressDTO;
import app.response.AddressResponse;
import app.response.ResponseObject;
import app.service.impl.AddressServiceImpl;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("${api.prefix}/address")
@RequiredArgsConstructor
public class AddressController {

    public final AddressServiceImpl addressService;

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
}
