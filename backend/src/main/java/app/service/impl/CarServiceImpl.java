package app.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import app.repository.CarRepository;
import app.response.CarResponse;
import app.service.CarService;

/**
 * CarServiceImpl
 * Version: 1.0
 * Date: 5/24/2024
 * Modification Logs
 * DATE AUTHOR DESCRIPTION
 * -------------------------------------
 * 5/24/2024 kiet-kun-afk Create
 */
@Service
public class CarServiceImpl implements CarService {

    @Autowired
    private CarRepository carRepository;

    @Override
    public List<CarResponse> getAll() {
        return carRepository.findAll().stream().map(CarResponse::fromCarResponse).toList();
    }

}
