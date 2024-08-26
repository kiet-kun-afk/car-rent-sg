package app.response;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

import app.model.Role;
import app.model.Staff;
import app.model.cards.CitizenCard;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Setter
@Getter
@NoArgsConstructor
public class StaffResponse {

    private Integer staffId;

    private String fullName;

    private Boolean gender;

    private String phoneNumber;

    private LocalDate birthDate;

    private String email;

    private List<String> roles;

    private Boolean status;

    private String avatarImage;

    private Integer address;

    private String province;
    private String district;
    private String ward;
    private String street;

    private CitizenCardResponse citizenCard;

    private LocalDateTime createdAt;

    private LocalDateTime updatedAt;

    public StaffResponse(Staff staff) {
        this.staffId = staff.getStaffId();
        this.fullName = staff.getFullName();
        this.gender = staff.getGender();
        this.phoneNumber = staff.getPhoneNumber();
        this.birthDate = staff.getBirthDate();
        this.email = staff.getEmail();
        this.roles = staff.getRoles().stream().map(Role::getName).toList();
        this.status = staff.getStatus();
        this.avatarImage = staff.getAvatarImage();
        // load địa chỉ
        this.address = staff.getAddress() == null ? null : staff.getAddress().getAddressId();
        this.province = staff.getAddress() == null ? null : staff.getAddress().getProvince();
        this.district = staff.getAddress() == null ? null : staff.getAddress().getDistrict();
        this.ward = staff.getAddress() == null ? null : staff.getAddress().getWard();
        this.street = staff.getAddress() == null ? null : staff.getAddress().getStreet();
        if (staff.getCitizenCard() == null) {
            this.citizenCard = new CitizenCardResponse(0, "chưa cập nhật", avatarImage, avatarImage, LocalDate.now(),
                    LocalDate.now());
        } else {
            this.citizenCard = CitizenCardResponse.fromCitizenCard(staff.getCitizenCard());
        }

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
