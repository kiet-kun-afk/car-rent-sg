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
        this.district = address.getDistrict();
        this.province = address.getProvince();
        this.ward = address.getWard();
        this.street = address.getStreet();
        this.rememberName = address.getRememberName();
    }

    public static AddressResponse fromResponse(Address address) {
        return new AddressResponse(address);
    }

}
