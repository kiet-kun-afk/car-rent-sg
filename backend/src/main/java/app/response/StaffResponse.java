package app.response;

import java.time.LocalDate;
// import java.sql.Date;
// import java.time.LocalDateTime;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonProperty;

import app.model.Role;
import app.model.Staff;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Setter
@Getter
@NoArgsConstructor
public class StaffResponse {

    @JsonProperty("staff_id")
    private Integer staffId;

    @JsonProperty("first_name")
    private String firstName;

    @JsonProperty("last_name")
    private String lastName;

    private Boolean gender;

    @JsonProperty("phone_number")
    private String phoneNumber;

    @JsonProperty("birth_date")
    private LocalDate birthDate;

    private String email;

    @JsonProperty("staff_roles")
    private List<String> roles;

    private Boolean status;

    @JsonProperty("avatar_image")
    private String avatarImage;

    private String password;

    @JsonProperty("address_id")
    private Integer address;

    @JsonProperty("citizen_id")
    private Integer citizenCard;

    public StaffResponse(Staff staff) {
        this.staffId = staff.getStaffId();
        // this.firstName = staff.getFirstName();
        // this.lastName = staff.getLastName();
        this.gender = staff.getGender();
        this.phoneNumber = staff.getPhoneNumber();
        this.birthDate = staff.getBirthDate();
        this.email = staff.getEmail();
        this.roles = staff.getRoles().stream().map(Role::getName).toList();
        this.status = staff.getStatus();
        this.avatarImage = staff.getAvatarImage();
        this.password = staff.getPassword();
        this.address = staff.getAddress().getAddressId();
        this.citizenCard = staff.getCitizenCard().getCitizenId();
    }

    public static StaffResponse fromStaff(Staff staff) {
        return new StaffResponse(staff);
    }

    public static StaffResponse registerStaff(Staff staff) {
        StaffResponse response = new StaffResponse();
        response.setStaffId(staff.getStaffId());
        response.setEmail(staff.getEmail());
        response.setPhoneNumber(staff.getPhoneNumber());
        response.setRoles(staff.getRoles().stream().map(Role::getName).toList());
        response.setPassword(staff.getPassword());
        // response.setFirstName(staff.getFirstName());
        // response.setLastName(staff.getLastName());
        // response.setGender(staff.getGender());
        // response.setBirthDate(staff.getBirthDate());
        // response.setStatus(staff.getStatus());
        // response.setAvatarImage(staff.getAvatarImage());
        return response;
    }
}
