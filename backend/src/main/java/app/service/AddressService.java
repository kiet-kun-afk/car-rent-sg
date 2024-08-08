package app.service;

import java.util.List;

import app.dto.AddressDTO;
import app.response.AddressResponse;

public interface AddressService {

    public List<AddressResponse> getALL();

    public AddressResponse getOne(Integer id);

    public AddressResponse Post(AddressDTO addressDTO);

    public AddressResponse Put(Integer id, AddressDTO addressDTO);

    public void Delete(Integer id) throws Exception;

    public AddressResponse updateCustomerAddress(AddressDTO addressDTO) throws Exception;

    public AddressResponse getCustomerAddress() throws Exception;

}
