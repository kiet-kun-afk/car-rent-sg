package app.service.impl;

import java.io.Serializable;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import app.dto.CarDTO;
// import app.exception.InvalidParamException;
import app.model.Branch;
import app.model.Brand;
// import app.exception.InvalidParamException;
import app.model.Car;
import app.model.Category;
import app.repository.BranchesRepository;
import app.repository.BrandRepository;
import app.repository.CarRepository;
import app.repository.CategoryRepository;
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
public class CarServiceImpl implements CarService, Serializable {
	@Autowired
	CarRepository carres;

	@Autowired
	BranchesRepository brachesres;

	@Autowired
	BrandRepository brandres;

	@Autowired
	CategoryRepository categoryres;

	@Override
	public List<CarResponse> getAll() {
		// TODO Auto-generated method stub

		return carres.findAll().stream().map(CarResponse::fromCarResponse).toList();
	}

	@Override
	public CarResponse getOne(Integer id) {
		Car car = carres.findById(id).orElse(null);
		// TODO Auto-generated method stub
		return CarResponse.fromCarResponse(car);
	}

	@Override
	public CarResponse Post(CarDTO carDTO) {
		// if(carres.existsById(carDTO.getCarId())){
		// throw new InvalidParamException("id is already registered");
		// }

		Branch branchid = brachesres.findById(carDTO.getBranchId()).orElse(null);
		System.out.println(branchid);

		Brand brandid = brandres.findById(carDTO.getBrandId()).orElse(null);

		Category categoryid = categoryres.findById(carDTO.getCategoryId()).orElse(null);

		Car car = new Car();
		car.setBackImage(carDTO.getBackImage());
		car.setBranch(branchid);
		car.setBrand(brandid);
		// carDTO.setCarId(car.getCarId());
		car.setCarName(carDTO.getCarName());
		car.setCategory(categoryid);
		car.setDescribe(carDTO.getDescribe());
		car.setFeatures(carDTO.getFeatures());
		car.setFrontImage(carDTO.getFrontImage());
		car.setFuelConsumption(carDTO.getFuelConsumption());
		car.setFuelType(carDTO.getFuelType());
		car.setLeftImage(carDTO.getLeftImage());
		car.setNumberOfSeat(carDTO.getNumberOfSeat());
		car.setRegistrationDate(carDTO.getRegistrationDate());
		car.setRegistrationPlate(carDTO.getRegistrationPlate());
		car.setRentCost(carDTO.getRentCost());
		car.setRightImage(carDTO.getRightImage());
		car.setStatus(carDTO.getStatus());
		car.setTransmission(carDTO.getTransmission());
		carres.save(car);

		return CarResponse.fromCarResponse(car);
	}

	@Override
	public CarResponse Put(Integer id, CarDTO carDTO) {
		// if(!carres.existsById(id)){
		// return null;
		// }
		Branch branchid = brachesres.findById(carDTO.getBranchId()).orElse(null);
		System.out.println(branchid);

		Brand brandid = brandres.findById(carDTO.getBrandId()).orElse(null);

		Category categoryid = categoryres.findById(carDTO.getCategoryId()).orElse(null);

		Optional<Car> optionalcar = carres.findById(id);

		if (optionalcar.isPresent()) {
			Car car = optionalcar.get();
			car.setBackImage(carDTO.getBackImage());
			car.setBranch(branchid);
			car.setBrand(brandid);
			// carDTO.setCarId(car.getCarId());
			car.setCarName(carDTO.getCarName());
			car.setCategory(categoryid);
			car.setDescribe(carDTO.getDescribe());
			car.setFeatures(carDTO.getFeatures());
			car.setFrontImage(carDTO.getFrontImage());
			car.setFuelConsumption(carDTO.getFuelConsumption());
			car.setFuelType(carDTO.getFuelType());
			car.setLeftImage(carDTO.getLeftImage());
			car.setNumberOfSeat(carDTO.getNumberOfSeat());
			car.setRegistrationDate(carDTO.getRegistrationDate());
			car.setRegistrationPlate(carDTO.getRegistrationPlate());
			car.setRentCost(carDTO.getRentCost());
			car.setRightImage(carDTO.getRightImage());
			car.setStatus(carDTO.getStatus());
			car.setTransmission(carDTO.getTransmission());

			carres.save(car);

			return CarResponse.fromCarResponse(car);

		} else {
			throw new RuntimeException("Car not found with id " + id);
		}

	}

	@Override
	public void Delete(Integer id) {
		if (carres.existsById(id)) {
			Car car = new Car();
			car.setStatus(false);
			// carres.save(car);
		}
	}

	// @Override
	// public CarResponse DeletePut(Integer id, CarDTO carDTO) {
	// Car car = carres.findById(id).orElse(null);

	// if (car != null) {
	// Car car1 = new Car();
	// car1.setStatus(false);
	// }
	// }

}
