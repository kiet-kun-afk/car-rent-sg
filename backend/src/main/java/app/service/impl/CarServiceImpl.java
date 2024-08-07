package app.service.impl;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import app.dto.CarDTO;
import app.exception.DataNotFoundException;
import app.exception.InvalidParamException;
import app.model.Branch;
import app.model.Brand;
import app.model.Car;
import app.model.Category;
import app.repository.BranchesRepository;
import app.repository.BrandRepository;
import app.repository.CarRepository;
import app.repository.CategoryRepository;
import app.repository.specification.CarSpecifications;
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
	CarRepository carres;

	@Autowired
	BranchesRepository brachesres;

	@Autowired
	BrandRepository brandres;

	@Autowired
	CategoryRepository categoryres;

	@Autowired
	FileService fileService;

	@Autowired
	ContractServiceImpl contractService;

	@Override
	public List<CarResponse> getAll() {

		return carres.findAll().stream().map(CarResponse::fromCarResponse).toList();
	}

	@Override
	public CarResponse getOne(String registrationPlate) {
		Car car = carres.findByRegistrationPlate(registrationPlate);

		return CarResponse.fromCarResponse(car);
	}

	@Override
	public CarResponse Post(CarDTO carDTO) {

		Branch branchid = brachesres.findById(carDTO.getBranchId()).orElse(null);
		System.out.println(branchid);

		Brand brandid = brandres.findById(carDTO.getBrandId()).orElse(null);

		Category categoryid = categoryres.findById(carDTO.getCategoryId()).orElse(null);

		Car car = new Car();
		// car.setBackImage(carDTO.getBackImage());
		car.setBranch(branchid);
		car.setBrand(brandid);
		car.setCarName(carDTO.getCarName());
		car.setCategory(categoryid);
		car.setDescribe(carDTO.getDescribe());
		car.setFeatures(carDTO.getFeatures());
		// car.setFrontImage(carDTO.getFrontImage());
		car.setFuelConsumption(carDTO.getFuelConsumption());
		car.setFuelType(carDTO.getFuelType());
		// car.setLeftImage(carDTO.getLeftImage());
		car.setNumberOfSeat(carDTO.getNumberOfSeat());
		car.setRegistrationDate(carDTO.getRegistrationDate());
		car.setRegistrationPlate(carDTO.getRegistrationPlate());
		car.setRentCost(carDTO.getRentCost());
		// car.setRightImage(carDTO.getRightImage());
		car.setStatus(carDTO.getStatus());
		car.setTransmission(carDTO.getTransmission());
		carres.save(car);

		return CarResponse.fromCarResponse(car);
	}

	@Override
	public CarResponse Put(Integer id, CarDTO carDTO) {
		Branch branchid = brachesres.findById(carDTO.getBranchId()).orElse(null);
		System.out.println(branchid);

		Brand brandid = brandres.findById(carDTO.getBrandId()).orElse(null);

		Category categoryid = categoryres.findById(carDTO.getCategoryId()).orElse(null);

		Optional<Car> optionalcar = carres.findById(id);

		if (optionalcar.isPresent()) {
			Car car = optionalcar.get();
			// car.setBackImage(carDTO.getBackImage());
			car.setBranch(branchid);
			car.setBrand(brandid);
			// carDTO.setCarId(car.getCarId());
			car.setCarName(carDTO.getCarName());
			car.setCategory(categoryid);
			car.setDescribe(carDTO.getDescribe());
			car.setFeatures(carDTO.getFeatures());
			// car.setFrontImage(carDTO.getFrontImage());
			car.setFuelConsumption(carDTO.getFuelConsumption());
			car.setFuelType(carDTO.getFuelType());
			// car.setLeftImage(carDTO.getLeftImage());
			car.setNumberOfSeat(carDTO.getNumberOfSeat());
			car.setRegistrationDate(carDTO.getRegistrationDate());
			car.setRegistrationPlate(carDTO.getRegistrationPlate());
			car.setRentCost(carDTO.getRentCost());
			// car.setRightImage(carDTO.getRightImage());
			car.setStatus(carDTO.getStatus());
			car.setTransmission(carDTO.getTransmission());

			carres.save(car);

			return CarResponse.fromCarResponse(car);

		} else {
			throw new RuntimeException("Car not found with id " + id);
		}

	}

	@Override
	public void Delete(String registrationPlate) throws Exception {
		Car car = carres.findByRegistrationPlateAndStatusTrue(registrationPlate);

		if (car == null) {
			throw new DataNotFoundException("Car not found with id ");
		}
		car.setStatus(false);
		carres.save(car);
	}

	@Override
	public List<CarResponse> getCarsForIndex(Integer pageNumber, Integer pageSize)
			throws Exception {
		LocalDateTime today = LocalDateTime.now();
		Pageable pageable = PageRequest.of(pageNumber, pageSize);
		Page<Car> page = carres.findCarsNotInContractToday(today, pageable);
		List<Car> cars = page.getContent();
		List<CarResponse> carResponses = cars.stream().map(CarResponse::fromCarResponse).toList();
		return carResponses;
	}

	@Override
	public CarResponse createNewCar(CarDTO carDTO) throws Exception {
		String registrationPlate = carDTO.getRegistrationPlate();
		if (carres.existsByRegistrationPlate(registrationPlate)) {
			throw new InvalidParamException("Already registered");
		}
		Integer branchId = carDTO.getBranchId();
		Branch branch = brachesres.findById(branchId)
				.orElseThrow(() -> new DataNotFoundException("Branch not found"));
		Integer brandId = carDTO.getBrandId();
		Brand brand = brandres.findById(brandId)
				.orElseThrow(() -> new DataNotFoundException("Brand not found"));
		Integer categoryId = carDTO.getCategoryId();
		Category category = categoryres.findById(categoryId)
				.orElseThrow(() -> new DataNotFoundException("Category not found"));
		Car car = new Car();
		car.setBranch(branch);
		car.setBrand(brand);
		car.setCategory(category);
		car.setRegistrationPlate(registrationPlate);

		car.setCarName(carDTO.getCarName());
		car.setRentCost(carDTO.getRentCost());
		car.setNumberOfSeat(carDTO.getNumberOfSeat());
		car.setTransmission(carDTO.getTransmission());

		car.setFuelType(carDTO.getFuelType());
		car.setFuelConsumption(carDTO.getFuelConsumption());
		car.setFeatures(carDTO.getFeatures());
		car.setFrontImage(fileService.upload(carDTO.getFrontImage()));

		car.setBackImage(fileService.upload(carDTO.getBackImage()));
		car.setLeftImage(fileService.upload(carDTO.getLeftImage()));
		car.setRightImage(fileService.upload(carDTO.getRightImage()));
		car.setDescribe(carDTO.getDescribe());

		car.setRegistrationDate(carDTO.getRegistrationDate());
		car.setStatus(true);
		// car.setCreatedAt(LocalDateTime.now());
		// car.setUpdatedAt(LocalDateTime.now());

		carres.save(car);
		return CarResponse.fromCarResponse(car);
	}

	@Override
	public CarResponse updateCar(String registrationPlate, CarDTO carDTO) throws Exception {
		Car car = carres.findByRegistrationPlate(registrationPlate);
		if (carres.existsByRegistrationPlateAndCarIdNot(registrationPlate, car.getCarId())) {
			throw new InvalidParamException("Already registered");
		}
		Integer branchId = carDTO.getBranchId();
		Branch branch = brachesres.findById(branchId)
				.orElseThrow(() -> new DataNotFoundException("Branch not found"));
		Integer brandId = carDTO.getBrandId();
		Brand brand = brandres.findById(brandId)
				.orElseThrow(() -> new DataNotFoundException("Brand not found"));
		Integer categoryId = carDTO.getCategoryId();
		Category category = categoryres.findById(categoryId)
				.orElseThrow(() -> new DataNotFoundException("Category not found"));
		car.setBranch(branch);
		car.setBrand(brand);
		car.setCategory(category);
		car.setRegistrationPlate(registrationPlate);
		car.setCarName(
				carDTO.getCarName() == null ? car.getCarName() : carDTO.getCarName());
		car.setRentCost(carDTO.getRentCost());
		car.setNumberOfSeat(carDTO.getNumberOfSeat());
		car.setTransmission(
				carDTO.getTransmission() == null ? car.getTransmission() : carDTO.getTransmission());
		car.setFuelType(
				carDTO.getFuelType() == null ? car.getFuelType() : carDTO.getFuelType());
		car.setFuelConsumption(
				carDTO.getFuelConsumption() == null ? car.getFuelConsumption() : carDTO.getFuelConsumption());
		car.setFeatures(
				carDTO.getFeatures() == null ? car.getFeatures() : carDTO.getFeatures());
		car.setFrontImage(
				carDTO.getFrontImage() == null ? car.getFrontImage() : fileService.upload(carDTO.getFrontImage()));
		car.setBackImage(
				carDTO.getBackImage() == null ? car.getBackImage() : fileService.upload(carDTO.getBackImage()));
		car.setLeftImage(
				carDTO.getLeftImage() == null ? car.getLeftImage() : fileService.upload(carDTO.getLeftImage()));
		car.setRightImage(
				carDTO.getRightImage() == null ? car.getRightImage() : fileService.upload(carDTO.getRightImage()));
		car.setDescribe(
				carDTO.getDescribe() == null ? car.getDescribe() : carDTO.getDescribe());
		car.setRegistrationDate(
				carDTO.getRegistrationDate() == null ? car.getRegistrationDate() : carDTO.getRegistrationDate());
		car.setStatus(
				carDTO.getStatus() == null ? car.getStatus() : carDTO.getStatus());
		carres.save(car);
		return CarResponse.fromCarResponse(car);
	}

	@Override
	public List<CarResponse> getCarsDeleted() throws Exception {
		List<Car> cars = carres.findAllByStatusFalse();
		return cars.stream().map(CarResponse::fromCarResponse).toList();
	}

	@Override
	public void restoreCar(String registrationPlate) throws Exception {
		Car car = carres.findByRegistrationPlateAndStatusFalse(registrationPlate);
		if (car == null) {
			throw new DataNotFoundException("Car not found");
		}
		car.setStatus(true);
		carres.save(car);
	}

	@Override
	public List<CarResponse> filterCar(LocalDateTime startDate, LocalDateTime endDate,
			String brandName, String countryOrigin, String transmission, String fuelType,
			List<String> categoryNames, Double minCost, Double maxCost, Integer minSeat, Integer maxSeat, String sortBy,
			Integer pageNumber, Integer pageSize)
			throws Exception {
		Specification<Car> specification = Specification.where(CarSpecifications.hasStatus(true)
				.and(CarSpecifications.hasCategory(categoryNames))
				.and(CarSpecifications.hasCountry(countryOrigin))
				.and(CarSpecifications.hasBrandName(brandName))
				.and(CarSpecifications.hasTransmission(transmission))
				.and(CarSpecifications.hasFuelType(fuelType))
				.and(CarSpecifications.hasRentCost(minCost, maxCost))
				.and(CarSpecifications.hasNumberOfSeat(minSeat, maxSeat)));
		Sort sort;
		if (sortBy == null || sortBy.isEmpty()) {
			sort = Sort.by("carName");
		} else if (sortBy.equals("price_asc")) {
			sort = Sort.by(Sort.Direction.ASC, "rentCost");
		} else if (sortBy.equals("price_desc")) {
			sort = Sort.by(Sort.Direction.DESC, "rentCost");
		} else {
			sort = Sort.by("carName"); // default
		}
		Pageable pageable = PageRequest.of(pageNumber, pageSize, sort);
		Page<Car> page = carres.findAll(specification, pageable);
		List<Car> cars = page.getContent();
		List<Car> carsWithoutOverlappingContracts = cars.stream()
				.filter(car -> contractService.isContractValidForCar(car,
						startDate == null ? LocalDateTime.now() : startDate,
						endDate == null ? LocalDateTime.now() : endDate))
				.collect(Collectors.toList());
		return carsWithoutOverlappingContracts.stream().map(CarResponse::fromCarResponse).toList();
	}

	@Override
	public Page<CarResponse> filterCarPage(LocalDateTime startDate, LocalDateTime endDate, String brandName,
			String countryOrigin, String transmission, String fuelType, List<String> categoryNames, Double minCost,
			Double maxCost, Integer minSeat, Integer maxSeat, String sortBy, Integer pageNumber, Integer pageSize)
			throws Exception {
		Specification<Car> specification = Specification.where(CarSpecifications.hasStatus(true)
				.and(CarSpecifications.hasCategory(categoryNames))
				.and(CarSpecifications.hasCountry(countryOrigin))
				.and(CarSpecifications.hasBrandName(brandName))
				.and(CarSpecifications.hasTransmission(transmission))
				.and(CarSpecifications.hasFuelType(fuelType))
				.and(CarSpecifications.hasRentCost(minCost, maxCost))
				.and(CarSpecifications.hasNumberOfSeat(minSeat, maxSeat)));
		Sort sort;
		if (sortBy == null || sortBy.isEmpty()) {
			sort = Sort.by(Sort.Direction.DESC, "createdAt");
		} else if (sortBy.equals("price_asc")) {
			sort = Sort.by(Sort.Direction.ASC, "rentCost");
		} else if (sortBy.equals("price_desc")) {
			sort = Sort.by(Sort.Direction.DESC, "rentCost");
		} else if (sortBy.equals("name")) {
			sort = Sort.by("carName");
		} else {
			sort = Sort.by(Sort.Direction.DESC, "createdAt");
			// default
		}
		Pageable pageable = PageRequest.of(pageNumber, pageSize, sort);
		Page<Car> page = carres.findAll(specification, pageable);
		return page.map(CarResponse::fromCarResponse);
	}

}
