package app.service;

import app.dto.login.LoginDTO;
import app.dto.login.RegisterStaffDTO;
import app.model.Staff;
import app.response.LoginResponse;
import app.response.StaffResponse;

public interface StaffService {

    public LoginResponse loginStaff(LoginDTO staffDTO) throws Exception;

    public StaffResponse registerStaff(RegisterStaffDTO staffDTO) throws Exception;

    public Staff getAuth();
}
