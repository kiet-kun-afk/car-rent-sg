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

import app.dto.CitizencardDTO;
import app.response.CitizencardResponse;
import app.response.ResponseObject;
import app.service.impl.CitizencardServiceImpl;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("${api.prefix}/citizencards")
@RequiredArgsConstructor
public class CitizencardController {
    @Autowired
    CitizencardServiceImpl citizendcardservice;

    @GetMapping("")
    public ResponseEntity<ResponseObject> getAll() {
        try {
            List<CitizencardResponse> citizencardReponses = citizendcardservice.getAll();
            return ResponseEntity.ok(ResponseObject.builder()
                    .status(200)
                    .data(citizencardReponses)
                    .build());
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(ResponseObject.builder()
                    .status(400)
                    .message("Update citizen failed")
                    .data(e.getMessage())
                    .build());
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<ResponseObject> getById(@PathVariable("id") Integer id) {

        try {
            CitizencardResponse citizencardResponse = citizendcardservice.getOne(id);
            return ResponseEntity.ok(ResponseObject.builder()
                    .status(200)
                    .data(citizencardResponse)
                    .build());
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(ResponseObject.builder()
                    .status(400)
                    .message(e.getMessage())
                    .build());
        }
    }

    @PostMapping("")
    public ResponseEntity<ResponseObject> post(@RequestBody CitizencardDTO citizencardDTO) {
        try {
            CitizencardResponse citizencardResponse = citizendcardservice.Post(citizencardDTO);
            return ResponseEntity.ok(ResponseObject.builder()
                    .status(200)
                    .data(citizencardResponse)
                    .build());
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(ResponseObject.builder()
                    .status(400)
                    .message(e.getMessage())
                    .build());
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<ResponseObject> post(@PathVariable("id") Integer id,
            @RequestBody CitizencardDTO citizencardDTO) {
        try {
            CitizencardResponse citizencardResponse = citizendcardservice.Put(id, citizencardDTO);
            return ResponseEntity.ok(ResponseObject.builder()
                    .status(200)
                    .data(citizencardResponse)
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
            citizendcardservice.Delete(id);
            return ResponseEntity.ok(ResponseObject.builder()
                    .status(200)
                    .build());
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(ResponseObject.builder()
                    .status(400)
                    .message(e.getMessage())
                    .build());
        }
    }

}
