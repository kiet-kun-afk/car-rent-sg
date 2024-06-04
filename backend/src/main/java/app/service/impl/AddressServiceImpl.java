package app.service.impl;

import java.io.Serializable;
import java.util.List;
// import java.util.Optional;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import app.dto.AddressDTO;
import app.exception.InvalidParamException;
import app.model.Address;
// import app.model.Address;
import app.repository.AddressRepository;
import app.response.AddressResponse;
import app.service.AddressService;

@Service
public class AddressServiceImpl implements AddressService, Serializable {

    @Autowired
    AddressRepository addressRes;

    @Override
    public List<AddressResponse> getALL() {
        // TODO Auto-generated method stub
        return addressRes.findAll().stream().map(AddressResponse::fromCarResponse).toList();
    }

    @Override
    public AddressResponse getOne(Integer id) {
        // TODO Auto-generated method stub
        Address address = addressRes.findById(id).orElse(null);

        return AddressResponse.fromCarResponse(address);
    }

    @Override
    public AddressResponse Post(AddressDTO addressDTO) {

        Address address = new Address();

        address.setDistrict(addressDTO.getDistrict());
        address.setProvince(addressDTO.getProvince());
        address.setStreet(addressDTO.getStreet());
        address.setWard(addressDTO.getWard());

        addressRes.save(address);

        return AddressResponse.fromCarResponse(address);

    }

    @Override
    public AddressResponse Put(Integer id, AddressDTO addressDTO) {
        // TODO Auto-generated method stub

        Optional<Address> optionaladdress = addressRes.findById(id);

        if (optionaladdress.isPresent()) {
            Address address = optionaladdress.get();
            address.setDistrict(addressDTO.getDistrict());
            address.setProvince(addressDTO.getProvince());
            address.setStreet(addressDTO.getStreet());
            address.setWard(addressDTO.getWard());

            addressRes.save(address);

            return AddressResponse.fromCarResponse(address);

        } else {
            throw new RuntimeException("Car not found with id " + id);
        }

    }

    @Override
    public void Delete(Integer id) throws Exception {
        if (!addressRes.existsById(id)) {
            throw new InvalidParamException("ADdress not found");
        }
        addressRes.deleteById(id);
    }

}
