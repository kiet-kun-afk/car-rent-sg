package app.service.impl;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import app.dto.BrandDTO;
import app.exception.InvalidParamException;
import app.model.Brand;
import app.repository.BrandRepository;
import app.response.BrandReponse;
import app.service.BrandService;

@Service
public class BrandServiceImpl implements BrandService {

    @Autowired
    BrandRepository brandRes;

    @Override
    public List<BrandReponse> getALL() {
        return brandRes.findAll().stream().map(BrandReponse::fromBrandResponse).toList();
    }

    @Override
    public BrandReponse getOne(Integer id) {
        // TODO Auto-generated method stub
        Brand brand = brandRes.findById(id).orElse(null);
        return BrandReponse.fromBrandResponse(brand);

    }

    @Override
    public BrandReponse Post(BrandDTO brandDTO) {
        // TODO Auto-generated method stub
        Brand brand = new Brand();

        brand.setBrandImage(brandDTO.getBrandImage());
        brand.setBrandName(brandDTO.getBrandName());
        brand.setCountryOrigin(brandDTO.getCountryOrigin());

        brandRes.save(brand);
        return BrandReponse.fromBrandResponse(brand);
    }

    @Override
    public BrandReponse Put(Integer id, BrandDTO brandDTO) {
        // TODO Auto-generated method stub
        Optional<Brand> optionalbrand = brandRes.findById(id);

        if (optionalbrand.isPresent()) {
            Brand brand = optionalbrand.get();
            brand.setBrandImage(brandDTO.getBrandImage());
            brand.setBrandName(brandDTO.getBrandName());
            brand.setCountryOrigin(brandDTO.getCountryOrigin());
            brandRes.save(brand);
            return BrandReponse.fromBrandResponse(brand);
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
