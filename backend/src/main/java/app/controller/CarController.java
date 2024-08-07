package app.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import app.dto.CarDTO;
import app.response.CarResponse;
import app.response.ResponseObject;
import app.service.CarService;
import app.service.impl.FormatterService;
import jakarta.annotation.Nullable;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import org.springframework.data.domain.Page;
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

@RestController
@RequestMapping("${api.prefix}/cars")
@RequiredArgsConstructor
@CrossOrigin
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
                    .message("Get one car successfully")
                    .data(carResponse)
                    .build());
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(ResponseObject.builder()
                    .status(400)
                    .message("Get one car failed")
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
                    .message("Create car successfully")
                    .data(carResponse)
                    .build());
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(ResponseObject.builder()
                    .status(400)
                    .message("Create car failed")
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
                    .message("Update car successfully")
                    .data(carResponse)
                    .build());
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(ResponseObject.builder()
                    .status(400)
                    .message("Update car failed")
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
                    .message("Delete car failed")
                    .data(e.getMessage())
                    .build());
        }
    }

    @GetMapping("/index")
    public ResponseEntity<ResponseObject> index(
            @RequestParam(required = false) @Nullable Integer numberOfSeat,
            @RequestParam Optional<Integer> pageNumber,
            @RequestParam Optional<Integer> pageSize) {
        try {
            List<CarResponse> cars = carService.getCarsForIndex(pageNumber.orElse(0), pageSize.orElse(8));
            return ResponseEntity.ok(ResponseObject.builder()
                    .status(200)
                    .message("Get page car successfully")
                    .data(cars)
                    .build());
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(ResponseObject.builder()
                    .status(400)
                    .message("Get page car failed")
                    .data(e.getMessage())
                    .build());
        }
    }

    @PreAuthorize("hasAnyAuthority('ADMIN_ROLE', 'STAFF_ROLE')")
    @PostMapping("/create")
    public ResponseEntity<ResponseObject> create(@Valid @ModelAttribute CarDTO carDTO, BindingResult bindingResult) {
        if (bindingResult.hasErrors()) {
            List<String> errors = bindingResult.getFieldErrors().stream().map(FieldError::getDefaultMessage).toList();
            return ResponseEntity.badRequest().body(ResponseObject.builder()
                    .status(400)
                    .message("Create car failed, validation")
                    .data(errors)
                    .build());
        }
        try {
            CarResponse carResponse = carService.createNewCar(carDTO);
            return ResponseEntity.ok(ResponseObject.builder()
                    .status(200)
                    .message("Create car successfully")
                    .data(carResponse)
                    .build());
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(ResponseObject.builder()
                    .status(400)
                    .message("Create car failed")
                    .data(e.getMessage())
                    .build());
        }
    }

    @PreAuthorize("hasAnyAuthority('ADMIN_ROLE', 'STAFF_ROLE')")
    @PutMapping("/update/{registrationPlate}")
    public ResponseEntity<ResponseObject> update(@PathVariable("registrationPlate") String registrationPlate,
            @Valid @ModelAttribute CarDTO carDTO, BindingResult bindingResult) {
        if (bindingResult.hasErrors()) {
            List<String> errors = bindingResult.getFieldErrors().stream().map(FieldError::getDefaultMessage).toList();
            return ResponseEntity.badRequest().body(ResponseObject.builder()
                    .status(400)
                    .message("Update car failed, validation")
                    .data(errors)
                    .build());
        }
        try {
            CarResponse carResponse = carService.updateCar(registrationPlate, carDTO);
            return ResponseEntity.ok(ResponseObject.builder()
                    .status(200)
                    .message("Update car successfully")
                    .data(carResponse)
                    .build());
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(ResponseObject.builder()
                    .status(400)
                    .message("Update car failed")
                    .data(e.getMessage())
                    .build());
        }
    }

    @PreAuthorize("hasAnyAuthority('ADMIN_ROLE', 'STAFF_ROLE')")
    @GetMapping("/get-cars-deleted")
    public ResponseEntity<ResponseObject> getCarsDeleted() {
        try {
            List<CarResponse> cars = carService.getCarsDeleted();
            return ResponseEntity.ok(ResponseObject.builder()
                    .status(200)
                    .message("Get cars deleted successfully")
                    .data(cars)
                    .build());
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(ResponseObject.builder()
                    .status(400)
                    .message("Get cars deleted failed")
                    .data(e.getMessage())
                    .build());
        }
    }

    @PreAuthorize("hasAnyAuthority('ADMIN_ROLE', 'STAFF_ROLE')")
    @PutMapping("/restore/{registrationPlate}")
    public ResponseEntity<ResponseObject> restore(@PathVariable("registrationPlate") String registrationPlate) {
        try {
            carService.restoreCar(registrationPlate);
            return ResponseEntity.ok(ResponseObject.builder()
                    .status(200)
                    .message("Restore car successfully")
                    .build());
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(ResponseObject.builder()
                    .status(400)
                    .message("Restore car failed")
                    .data(e.getMessage())
                    .build());
        }
    }

    private final FormatterService formatterService;

    @GetMapping("/filter-car")
    public ResponseEntity<ResponseObject> filterCar(
            @RequestParam String startDate,
            @RequestParam String endDate,
            @RequestParam(required = false) String brandName,
            @RequestParam(required = false) String countryOrigin,
            @RequestParam(required = false) String transmission,
            @RequestParam(required = false) String fuelType,
            @RequestParam(required = false) String categoryNames,
            @RequestParam(required = false) @Nullable Double minCost,
            @RequestParam(required = false) @Nullable Double maxCost,
            @RequestParam(required = false) @Nullable Integer minSeat,
            @RequestParam(required = false) @Nullable Integer maxSeat,
            @RequestParam(required = false) String sortBy,
            @RequestParam Optional<Integer> pageNumber,
            @RequestParam Optional<Integer> pageSize) {
        try {
            LocalDateTime start = formatterService.stringToDateTime(startDate);
            LocalDateTime end = formatterService.stringToDateTime(endDate);
            List<CarResponse> cars = carService
                    .filterCar(start, end, brandName, countryOrigin, transmission, fuelType, categoryNames,
                               minCost, maxCost, minSeat, maxSeat, sortBy, pageNumber.orElse(0), pageSize.orElse(20));
            // List<CarResponse> cars = carService
            //Page<CarResponse> cars = carService
                    // .filterCar(startDate, endDate,
                    //.filterCarPage(startDate, endDate,
                            //brandName, countryOrigin, transmission, fuelType, categoryNames,
                            //minCost, maxCost, minSeat, maxSeat, sortBy, pageNumber.orElse(0), pageSize.orElse(20));
            return ResponseEntity.ok(ResponseObject.builder()
                    .status(200)
                    .message("Filter car successfully")
                    .data(cars)
                    .build());
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(ResponseObject.builder()
                    .status(400)
                    .message("Filter car failed")
                    .data(e.getMessage())
                    .build());
        }
    }
}
