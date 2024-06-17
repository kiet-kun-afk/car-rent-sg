package app.dto;

import java.time.LocalDate;
import java.util.Set;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class StaffDTO {
    private String firstName;
    private String lastName;
    private String phoneNumber;
    Set<String> roles;
    private LocalDate birthDate;
    private String email;
    private Boolean gender;
    private Boolean status;
    private String avatarImage;
    private String password;
    private Integer address;
    private Integer citizenCard;
}
