package app.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import app.service.impl.CarServiceImpl;

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

    private final CarServiceImpl carService;
}
