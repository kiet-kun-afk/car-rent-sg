package app.response;

import java.time.LocalDate;
import java.time.LocalDateTime;

import app.model.Customer;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Setter
@Getter
@NoArgsConstructor
public class CustomerResponse {

    private Integer customerId;

    // private String firstName;

    // private String lastName;

    private String fullName;

    private Boolean gender;

    private String phoneNumber;

    private LocalDate birthDate;

    private String email;

    private Boolean status;

    private String avatarImage;

    // @JsonIgnore
    // private String password;

    private Integer addressId;

    private Integer citizenCardId;

    private Integer driverLicenseId;

    private LocalDateTime createdAt;

    private LocalDateTime updatedAt;

    public CustomerResponse(Customer customer) {
        this.customerId = customer.getCustomerId();
        // this.firstName = customer.getFirstName();
        // this.lastName = customer.getLastName();
        this.fullName = customer.getFullName();
        this.gender = customer.getGender();
        this.phoneNumber = customer.getPhoneNumber();
        this.birthDate = customer.getBirthDate();
        this.email = customer.getEmail();
        this.status = customer.getStatus();
        this.avatarImage = customer.getAvatarImage();
        this.addressId = customer.getAddress() == null ? null
                : customer.getAddress().getAddressId();
        this.citizenCardId = customer.getCitizenCard() == null ? null
                : customer.getCitizenCard().getCitizenId();
        this.driverLicenseId = customer.getDriverLicense() == null ? null
                : customer.getDriverLicense().getDriverLicenseId();
        this.createdAt = customer.getCreatedAt();
        this.updatedAt = customer.getUpdatedAt();
    }

    public static CustomerResponse fromCustomer(Customer customer) {
        return new CustomerResponse(customer);
    }

    public static CustomerResponse registerCustomer(Customer customer) {
        CustomerResponse response = new CustomerResponse();
        response.setCustomerId(customer.getCustomerId());
        response.setEmail(customer.getEmail());
        response.setPhoneNumber(customer.getPhoneNumber());
        response.setFullName(customer.getFullName());
        // response.setFirstName(customer.getFirstName());
        // response.setLastName(customer.getLastName());
        // response.setGender(customer.getGender());
        // response.setBirthDate(customer.getBirthDate());
        // response.setStatus(customer.getStatus());
        // response.setAvatarImage(customer.getAvatarImage());
        return response;
    }
}
