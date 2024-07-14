package app.service;

import java.util.List;

import app.dto.CarDTO;

import app.response.CarResponse;

public interface CarService {

	public List<CarResponse> getAll();

	public CarResponse getOne(String registrationPlate);

	public CarResponse Post(CarDTO carDTO);

	public CarResponse Put(Integer id, CarDTO carDTO);

	public void Delete(String registrationPlate) throws Exception;

	// public CarResponse DeletePut(Integer id, CarDTO carDTO);

	public List<CarResponse> getCarsForIndex(Integer pageNumber, Integer pageSize)
			throws Exception;

	public CarResponse createNewCar(CarDTO carDTO) throws Exception;

	public CarResponse updateCar(String registrationPlate, CarDTO carDTO) throws Exception;

	public List<CarResponse> getCarsDeleted() throws Exception;

	public void restoreCar(String registrationPlate) throws Exception;
}
