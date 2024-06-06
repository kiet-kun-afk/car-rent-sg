package app.controller;

import org.springframework.web.bind.annotation.RequestMapping;

import org.springframework.web.bind.annotation.RestController;

import app.dto.CarDTO;
import app.response.CarResponse;
import app.response.ResponseObject;
import app.service.CarService;
// import app.service.impl.CarServiceImpl;

import lombok.RequiredArgsConstructor;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;

@RestController
@RequestMapping("${api.prefix}/cars")
@RequiredArgsConstructor
public class CarController {

    private final CarService carService;

    @GetMapping("")
    public ResponseEntity<ResponseObject> getAll() {
        try {
            List<CarResponse> carResponse = carService.getAll();
            return ResponseEntity.ok(ResponseObject.builder()
                    .status(200)
                    .message("Get all car successfully")
                    .data(carResponse)
                    .build());
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(ResponseObject.builder()
                    .status(400)
                    .message("Get all car failed")
                    .data(e.getMessage())
                    .build());
        }
    }

    @GetMapping("/{registrationPlate}")
    public ResponseEntity<ResponseObject> getOne(@PathVariable("registrationPlate") String registrationPlate) {
        try {
            CarResponse carResponse = carService.getOne(registrationPlate);
            return ResponseEntity.ok(ResponseObject.builder()
                    .status(200)
                    .message("Get all car successfully")
                    .data(carResponse)
                    .build());
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(ResponseObject.builder()
                    .status(400)
                    .message("Get all car failed")
                    .data(e.getMessage())
                    .build());
        }

    }

    @PostMapping("")
    public ResponseEntity<ResponseObject> Post(@RequestBody CarDTO carDTO) {
        try {
            CarResponse carResponse = carService.Post(carDTO);
            return ResponseEntity.ok(ResponseObject.builder()
                    .status(200)
                    .message("Get all car successfully")
                    .data(carResponse)
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
    public ResponseEntity<ResponseObject> Put(@PathVariable("id") Integer id, @RequestBody CarDTO carDTO) {
        try {
            CarResponse carResponse = carService.Put(id, carDTO);
            return ResponseEntity.ok(ResponseObject.builder()
                    .status(200)
                    .message("Get all car successfully")
                    .data(carResponse)
                    .build());
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(ResponseObject.builder()
                    .status(400)
                    .message("Get all car failed")
                    .data(e.getMessage())
                    .build());
        }
    }

    @DeleteMapping("/{registrationPlate}")
    public ResponseEntity<ResponseObject> Delete(@PathVariable("registrationPlate") String registrationPlate) {
        try {
            carService.Delete(registrationPlate);
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
