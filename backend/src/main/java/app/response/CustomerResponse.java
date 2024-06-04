package app.response;

import java.sql.Date;

import com.fasterxml.jackson.annotation.JsonProperty;

import app.model.Customer;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Setter
@Getter
@NoArgsConstructor
public class CustomerResponse {

    private Integer customerId;

    @JsonProperty("first_name")
    private String firstName;

    @JsonProperty("last_name")
    private String lastName;

    private Boolean gender;

    @JsonProperty("phone_number")
    private String phoneNumber;

    @JsonProperty("birth_date")
    private Date birthDate;

    private String email;

    private Boolean status;

    @JsonProperty("avatar_image")
    private String avatarImage;

    private String password;

    @JsonProperty("address_id")
    private Integer addressId;

    @JsonProperty("citizen_id")
    private Integer citizenCardId;

    @JsonProperty("driver_license_id")
    private Integer driverLicenseId;

    public CustomerResponse(Customer customer) {
        this.customerId = customer.getCustomerId();
        this.firstName = customer.getFirstName();
        this.lastName = customer.getLastName();
        this.gender = customer.getGender();
        this.phoneNumber = customer.getPhoneNumber();
        this.birthDate = customer.getBirthDate();
        this.email = customer.getEmail();
        this.status = customer.getStatus();
        this.avatarImage = customer.getAvatarImage();
        this.password = customer.getPassword();
        this.addressId = customer.getAddress().getAddressId();
        this.citizenCardId = customer.getCitizenCard().getCitizenId();
        this.driverLicenseId = customer.getDriverLicense().getDriverLicenseId();
    }

    public static CustomerResponse fromCustomer(Customer customer) {
        return new CustomerResponse(customer);
    }

    public static CustomerResponse registerCustomer(Customer customer) {
        CustomerResponse response = new CustomerResponse();
        response.setCustomerId(customer.getCustomerId());
        response.setEmail(customer.getEmail());
        response.setPhoneNumber(customer.getPhoneNumber());
        // response.setFirstName(customer.getFirstName());
        // response.setLastName(customer.getLastName());
        // response.setGender(customer.getGender());
        // response.setBirthDate(customer.getBirthDate());
        // response.setStatus(customer.getStatus());
        // response.setAvatarImage(customer.getAvatarImage());
        return response;
    }
}
