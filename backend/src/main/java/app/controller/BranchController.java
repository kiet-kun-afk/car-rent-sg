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

import app.dto.BranchDTO;
import app.response.BranchResponse;
import app.response.ResponseObject;
import app.service.impl.BranchServiceImpl;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("${api.prefix}/branchs")
@RequiredArgsConstructor
public class BranchController {
    private final BranchServiceImpl branchService;

    @GetMapping("")
    public ResponseEntity<ResponseObject> getAll() {
        try {
            List<BranchResponse> branchResponses = branchService.getAll();
            return ResponseEntity.ok(ResponseObject.builder()
                    .status(200)
                    .data(branchResponses)
                    .build());
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(ResponseObject.builder()
                    .status(400)
                    .message(e.getMessage())
                    .build());
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<ResponseObject> getOne(@PathVariable("id") Integer id) {
        try {
            BranchResponse branchResponse = branchService.getOne(id);
            return ResponseEntity.ok(ResponseObject.builder()
                    .status(200)
                    .data(branchResponse)
                    .build());
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(ResponseObject.builder()
                    .status(400)
                    .message(e.getMessage())
                    .build());
        }
    }

    @PostMapping("")
    public ResponseEntity<ResponseObject> Post(@RequestBody BranchDTO branchDTO) {
        try {
            BranchResponse branchResponse = branchService.post(branchDTO);
            return ResponseEntity.ok(ResponseObject.builder()
                    .status(200)
                    .message("success")
                    .data(branchResponse)
                    .build());
        } catch (Exception e) {
            // TODO: handle exception
            return ResponseEntity.badRequest().body(ResponseObject.builder()
                    .status(400)
                    .message("null response")
                    .message(e.getMessage())
                    .build());
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<ResponseObject> put(@PathVariable("id") Integer id, @RequestBody BranchDTO branchDTO) {
        try {
            BranchResponse branchResponse = branchService.put(id, branchDTO);
            return ResponseEntity.ok(ResponseObject.builder()
                    .status(200)
                    .data(branchResponse)
                    .build());
        } catch (Exception e) {
            // TODO: handle exception
            return ResponseEntity.badRequest().body(ResponseObject.builder()
                    .status(400)
                    .message(e.getMessage())
                    .build());
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ResponseObject> delete(@PathVariable("id") Integer id) {
        try {
            branchService.delete(id);
            return ResponseEntity.ok(ResponseObject.builder()
                    .status(200)
                    .build());
        } catch (Exception e) {
            // TODO: handle exception
            return ResponseEntity.badRequest().body(ResponseObject.builder()
                    .status(400)
                    .message(e.getMessage())
                    .build());
        }
    }
}
