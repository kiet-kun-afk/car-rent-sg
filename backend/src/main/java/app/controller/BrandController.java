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

import app.dto.BrandDTO;

import app.response.BrandReponse;
import app.response.ResponseObject;
import app.service.impl.BrandServiceImpl;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("${api.prefix}/brands")
@RequiredArgsConstructor
public class BrandController {

    private final BrandServiceImpl brandService;

    @GetMapping("")
    public ResponseEntity<ResponseObject> getAll() {
        try {
            List<BrandReponse> brandReponse = brandService.getALL();
            return ResponseEntity.ok(ResponseObject.builder()
                    .status(200)
                    .data(brandReponse)
                    .build());
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(ResponseObject.builder()
                    .status(400)
                    .message("Get all brand failed")
                    .data(e.getMessage())
                    .build());
        }

    }

    @GetMapping("/{id}")
    public ResponseEntity<ResponseObject> getOne(@PathVariable Integer id) {
        try {
            BrandReponse brandResponse = brandService.getOne(id);
            return ResponseEntity.ok(ResponseObject.builder()
                    .status(200)
                    .message("Get all brand successfully")
                    .data(brandResponse)
                    .build());
        } catch (Exception e) {
            // TODO: handle exception
            return ResponseEntity.badRequest().body(ResponseObject.builder()
                    .status(400)
                    .message("Get brand id failed")
                    .data(e.getMessage())
                    .build());
        }
    }

    @PostMapping("")
    public ResponseEntity<ResponseObject> Post(@RequestBody BrandDTO brandDTO) {
        try {
            BrandReponse brandReponse = brandService.Post(brandDTO);
            return ResponseEntity.ok(ResponseObject.builder()
                    .status(200)
                    .message("Get all brand successfully")
                    .data(brandReponse)
                    .build());

        } catch (Exception e) {
            return ResponseEntity.badRequest().body(ResponseObject.builder()
                    .status(400)
                    .message("Get all brand failed")
                    .data(e.getMessage())
                    .build());
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<ResponseObject> Put(@PathVariable Integer id, @RequestBody BrandDTO brandDTO) {
        try {
            BrandReponse brandReponse = brandService.Put(id, brandDTO);
            return ResponseEntity.ok(ResponseObject.builder()
                    .status(200)
                    .message("Get all brand successfully")
                    .data(brandReponse)
                    .build());
        } catch (Exception e) {
            // TODO: handle exception
            return ResponseEntity.badRequest().body(ResponseObject.builder()
                    .status(400)
                    .message("Get all brand failed")
                    .data(e.getMessage())
                    .build());
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ResponseObject> Delete(@PathVariable Integer id) {
        try {
            brandService.Delete(id);
            return ResponseEntity.ok(ResponseObject.builder()
                    .status(200)
                    .build());
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(ResponseObject.builder()
                    .status(400)
                    .message("Get all brand failed")
                    .data(e.getMessage())
                    .build());
        }
    }

}
