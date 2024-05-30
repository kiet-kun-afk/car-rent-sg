package app.service;

import java.util.List;

import app.response.CarResponse;

public interface CarService {
    List<CarResponse> getAll();
}
