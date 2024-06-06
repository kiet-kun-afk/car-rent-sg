package app.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import app.response.BillResponse;
import app.response.ResponseObject;
import app.service.BillService;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("${api.prefix}/bills")
@RequiredArgsConstructor
public class BillsController {

    private final BillService billService;

    @GetMapping("")
    public ResponseEntity<ResponseObject> getAll() {
        try {
            List<BillResponse> billResponse = billService.getAll();
            return ResponseEntity.ok(ResponseObject.builder()
                    .status(200)
                    .message("Get all car successfully")
                    .data(billResponse)
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
