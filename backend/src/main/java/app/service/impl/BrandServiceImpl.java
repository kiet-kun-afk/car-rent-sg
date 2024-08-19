package app.service.impl;

import java.util.Comparator;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import app.dto.BrandDTO;
import app.exception.InvalidParamException;
import app.model.Brand;
import app.repository.BrandRepository;
import app.response.BrandResponse;
import app.service.BrandService;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class BrandServiceImpl implements BrandService {

    private final BrandRepository brandRes;

    @Override
    public List<BrandResponse> getALL() {
        // return brandRes.findOrderBrands().stream().map(BrandResponse::fromBrandResponse).toList();

        // other way
        List<Brand> brandList = brandRes.findAll();
        // Filter out brands with no cars and map to BrandResponse
        List<BrandResponse> responseList = brandList.stream()
                .filter(brand -> !brand.getCars().isEmpty()) // Filter out brands with no cars
                .map(brand -> new BrandResponse(
                        brand.getBrandId(),
                        brand.getBrandName(),
                        brand.getBrandImage(),
                        brand.getCountryOrigin(),
                        brand.getCars().size() // Count the number of cars
                ))
                .sorted(Comparator.comparingInt(BrandResponse::getCarsCount).reversed()) // Sort by carsCount in descending order
                .collect(Collectors.toList());

        return responseList;
    }

    @Override
    public BrandResponse getOne(Integer id) {

        Brand brand = brandRes.findById(id).orElse(null);
        return BrandResponse.fromBrandResponse(brand);

    }

    @Override
    public BrandResponse Post(BrandDTO brandDTO) {

        Brand brand = new Brand();

        brand.setBrandImage(brandDTO.getBrandImage());
        brand.setBrandName(brandDTO.getBrandName());
        brand.setCountryOrigin(brandDTO.getCountryOrigin());

        brandRes.save(brand);
        return BrandResponse.fromBrandResponse(brand);
    }

    @Override
    public BrandResponse Put(Integer id, BrandDTO brandDTO) {

        Optional<Brand> optionalBrand = brandRes.findById(id);

        if (optionalBrand.isPresent()) {
            Brand brand = optionalBrand.get();
            brand.setBrandImage(brandDTO.getBrandImage());
            brand.setBrandName(brandDTO.getBrandName());
            brand.setCountryOrigin(brandDTO.getCountryOrigin());
            brandRes.save(brand);
            return BrandResponse.fromBrandResponse(brand);
        } else {
            throw new RuntimeException("Car not found with id " + id);
        }
    }

    @Override
    public void Delete(Integer id) throws Exception {
        if (!brandRes.existsById(id)) {
            throw new InvalidParamException("Brand not found");
        }
        brandRes.deleteById(id);
    }

}
