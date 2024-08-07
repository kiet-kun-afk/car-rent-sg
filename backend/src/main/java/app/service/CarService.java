package app.service;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.data.domain.Page;

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

	public List<CarResponse> filterCar(LocalDateTime startDate, LocalDateTime endDate,
			String brandName, String countryOrigin, String transmission, String fuelType,
			List<String> categoryNames, Double minCost, Double maxCost, Integer minSeat, Integer maxSeat, String sortBy,
			Integer pageNumber, Integer pageSize)
			throws Exception;

	public Page<CarResponse> filterCarPage(LocalDateTime startDate, LocalDateTime endDate,
			String brandName, String countryOrigin, String transmission, String fuelType,
			List<String> categoryNames, Double minCost, Double maxCost, Integer minSeat, Integer maxSeat, String sortBy,
			Integer pageNumber, Integer pageSize)
			throws Exception;
}
