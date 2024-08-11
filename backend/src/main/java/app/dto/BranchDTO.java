package app.dto;

import jakarta.validation.constraints.NotNull;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class BranchDTO {

    private String branchName;

    @NotNull(message = "email is not null")
    private String email;

    private String phoneNumber;

    @NotNull(message = "address id seats is not null")
    private Integer addressid;

}
