package app.service.impl;

import java.io.Serializable;
import java.util.List;
// import java.util.Optional;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import app.dto.AddressDTO;
import app.exception.DataNotFoundException;
import app.exception.InvalidParamException;
import app.model.Address;
import app.model.Customer;
// import app.model.Address;
import app.repository.AddressRepository;
import app.repository.CustomerRepository;
import app.response.AddressResponse;
import app.service.AddressService;
import app.service.CustomerService;

@Service
public class AddressServiceImpl implements AddressService, Serializable {

    @Autowired
    AddressRepository addressRes;

    @Autowired
    CustomerService customerService;

    @Autowired
    CustomerRepository customerRepository;

    @Override
    public List<AddressResponse> getALL() {
        return addressRes.findAll().stream().map(AddressResponse::fromResponse).toList();
    }

    @Override
    public AddressResponse getOne(Integer id) {
        Address address = addressRes.findById(id).orElse(null);

        return AddressResponse.fromResponse(address);
    }

    @Override
    public AddressResponse Post(AddressDTO addressDTO) {

        Address address = new Address();

        address.setDistrict(addressDTO.getDistrict());
        address.setProvince(addressDTO.getProvince());
        address.setStreet(addressDTO.getStreet());
        address.setWard(addressDTO.getWard());

        addressRes.save(address);

        return AddressResponse.fromResponse(address);

    }

    @Override
    public AddressResponse Put(Integer id, AddressDTO addressDTO) {

        Optional<Address> optionalAddress = addressRes.findById(id);

        if (optionalAddress.isPresent()) {
            Address address = optionalAddress.get();
            address.setDistrict(addressDTO.getDistrict());
            address.setProvince(addressDTO.getProvince());
            address.setStreet(addressDTO.getStreet());
            address.setWard(addressDTO.getWard());

            addressRes.save(address);

            return AddressResponse.fromResponse(address);

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

    @Override
    public AddressResponse updateCustomerAddress(AddressDTO addressDTO) throws Exception {
        Customer customer = customerService.getAuth();
        String province = addressDTO.getProvince();
        String district = addressDTO.getDistrict();
        String ward = addressDTO.getWard();
        String street = addressDTO.getStreet();
        String rememberName = addressDTO.getRememberName();
        Address address = addressRes.findByProvinceAndDistrictAndWardAndStreetAndRememberName(
                province, district,
                ward, street,
                rememberName);
        if (address == null) {
            address = new Address();
            address.setProvince(province);
            address.setDistrict(district);
            address.setWard(ward);
            address.setStreet(street);
            address.setRememberName(rememberName);
        }
        customer.setAddress(addressRes.save(address));
        customerRepository.save(customer);
        return AddressResponse.fromResponse(address);
    }

    @Override
    public AddressResponse getCustomerAddress() throws Exception {
        Customer customer = customerService.getAuth();
        Address address = addressRes.findByCustomerPhoneNumber(customer.getPhoneNumber());
        if (address == null) {
            throw new DataNotFoundException("Address not found");
        }
        return AddressResponse.fromResponse(address);
    }

}
