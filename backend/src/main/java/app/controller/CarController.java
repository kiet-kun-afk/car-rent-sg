package app.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import app.response.CarResponse;
import app.response.ResponseObject;
import app.service.CarService;
import lombok.RequiredArgsConstructor;

/**
 * CarController
 * Version: 1.0
 * Date: 5/24/2024
 * Modification Logs
 * DATE AUTHOR DESCRIPTION
 * -------------------------------------
 * 5/24/2024 kiet-kun-afk Create
 */
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
}
