package app.response;

import app.model.Branch;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class BranchResponse {

    private Integer branchId;
    private String branchName;
    private String email;
    private String phoneNumber;
    private Integer addressid;

    public BranchResponse(Branch branch) {
        this.branchId = branch.getBranchId();
        this.branchName = branch.getBranchName();
        this.email = branch.getEmail();
        this.phoneNumber = branch.getPhoneNumber();
        this.addressid = branch.getAddress().getAddressId();
    }

    public static BranchResponse fromBranchResponse(Branch branch) {
        return new BranchResponse(branch);
    }
}
