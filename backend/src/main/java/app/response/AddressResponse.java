package app.response;

import app.model.Address;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class AddressResponse {

    private Integer addressId;

    private String province;

    private String district;

    private String ward;

    private String street;

    private String rememberName;

    public AddressResponse(Address address) {
        this.addressId = address.getAddressId();
        this.district = address.getDistrict() == null ? "" : address.getDistrict();
        this.province = address.getProvince() == null ? "" : address.getProvince();
        this.ward = address.getWard() == null ? "" : address.getWard();
        this.street = address.getStreet() == null ? "" : address.getStreet();
        this.rememberName = address.getRememberName() == null ? "" : address.getRememberName();
    }

    public static AddressResponse fromResponse(Address address) {
        return new AddressResponse(address);
    }

}
