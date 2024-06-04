package app.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

import org.springframework.web.bind.annotation.RestController;

import app.dto.CategoryDTO;
import app.response.CategoryReponse;
import app.response.ResponseObject;

import app.service.impl.CategoryServiceImpl;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("${api.prefix}/categorys")
@RequiredArgsConstructor
public class CategoryController {

    @Autowired
    private final CategoryServiceImpl categoryService;

    @GetMapping("")
    public ResponseEntity<ResponseObject> getAll() {
        try {
            List<CategoryReponse> categoryReponses = categoryService.getAll();
            return ResponseEntity.ok(ResponseObject.builder()
                    .status(200)
                    .data(categoryReponses)
                    .build());
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(ResponseObject.builder()
                    .status(400)
                    .message("Get all category failed")
                    .data(e.getMessage())
                    .build());
        }

    }

    @GetMapping("/{id}")
    public ResponseEntity<ResponseObject> getOne(@PathVariable Integer id) {
        try {
            CategoryReponse categoryReponse = categoryService.getOne(id);
            return ResponseEntity.ok(ResponseObject.builder()
                    .status(200)
                    .message("Get all category successfully")
                    .data(categoryReponse)
                    .build());
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(ResponseObject.builder()
                    .status(400)
                    .message("Get all category failed")
                    .data(e.getMessage())
                    .build());
        }
    }

    @PostMapping("")
    public ResponseEntity<ResponseObject> Post(@RequestBody CategoryDTO categoryDTO) {
        try {
            CategoryReponse categoryReponse = categoryService.Post(categoryDTO);
            return ResponseEntity.ok(ResponseObject.builder()
                    .status(200)
                    .message("Create category successfully")
                    .data(categoryReponse)
                    .build());
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(ResponseObject.builder()
                    .status(400)
                    .message("Create category failed")
                    .data(e.getMessage())
                    .build());
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<ResponseObject> Put(@PathVariable Integer id, @RequestBody CategoryDTO categoryDTO) {
        try {
            CategoryReponse categoryReponse = categoryService.Put(id, categoryDTO);
            return ResponseEntity.ok(ResponseObject.builder()
                    .status(200)
                    .message("Update category successfully")
                    .data(categoryReponse)
                    .build());
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(ResponseObject.builder()
                    .status(400)
                    .message("Update category failed")
                    .data(e.getMessage())
                    .build());
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ResponseObject> Delete(@PathVariable Integer id) {
        try {
            categoryService.Delete(id);
            return ResponseEntity.ok(ResponseObject.builder()
                    .status(200)
                    .build());
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(ResponseObject.builder()
                    .status(400)
                    .message("Get all category failed")
                    .data(e.getMessage())
                    .build());
        }
    }
}
