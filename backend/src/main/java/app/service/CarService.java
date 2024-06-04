package app.service;

import java.util.List;

import app.dto.CarDTO;

import app.response.CarResponse;

public interface CarService {

	public List<CarResponse> getAll();

	public CarResponse getOne(Integer id);

	public CarResponse Post(CarDTO carDTO);

	public CarResponse Put(Integer id, CarDTO carDTO);

	public void Delete(Integer id);

	// public CarResponse DeletePut(Integer id, CarDTO carDTO);

}
