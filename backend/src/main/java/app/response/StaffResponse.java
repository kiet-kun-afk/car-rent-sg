package app.response;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

import app.model.Role;
import app.model.Staff;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Setter
@Getter
@NoArgsConstructor
public class StaffResponse {

    private Integer staffId;

    // private String firstName;

    // private String lastName;

    private String fullName;

    private Boolean gender;

    private String phoneNumber;

    private LocalDate birthDate;

    private String email;

    private List<String> roles;

    private Boolean status;

    private String avatarImage;

    // @JsonIgnore
    // private String password;

    private Integer address;

    private Integer citizenCard;

    private LocalDateTime createdAt;

    private LocalDateTime updatedAt;

    public StaffResponse(Staff staff) {
        this.staffId = staff.getStaffId();
        // this.firstName = staff.getFirstName();
        // this.lastName = staff.getLastName();
        this.fullName = staff.getFullName();
        this.gender = staff.getGender();
        this.phoneNumber = staff.getPhoneNumber();
        this.birthDate = staff.getBirthDate();
        this.email = staff.getEmail();
        this.roles = staff.getRoles().stream().map(Role::getName).toList();
        this.status = staff.getStatus();
        this.avatarImage = staff.getAvatarImage();
        this.address = staff.getAddress().getAddressId();
        this.citizenCard = staff.getCitizenCard().getCitizenId();
        this.createdAt = staff.getCreatedAt();
        this.updatedAt = staff.getUpdatedAt();
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
        // response.setFirstName(staff.getFirstName());
        // response.setLastName(staff.getLastName());
        // response.setGender(staff.getGender());
        // response.setBirthDate(staff.getBirthDate());
        // response.setStatus(staff.getStatus());
        // response.setAvatarImage(staff.getAvatarImage());
        return response;
    }
}
