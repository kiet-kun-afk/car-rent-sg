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

    // @JsonProperty
    private Integer addressId;

    private String province;

    // @JsonProperty
    private String district;

    private String ward;

    private String street;

    public AddressResponse(Address address) {
        this.addressId = address.getAddressId();
        this.district = address.getDistrict();
        this.province = address.getProvince();
        this.ward = address.getWard();
        this.street = address.getStreet();
    }

    public static AddressResponse fromCarResponse(Address address) {
        return new AddressResponse(address);
    }

}
