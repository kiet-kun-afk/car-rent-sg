package app.service;

import java.util.List;

import app.dto.StaffDTO;
import app.dto.login.ChangePasswordDTO;
import app.dto.login.LoginDTO;
import app.dto.login.RegisterStaffDTO;
import app.model.Staff;
import app.response.LoginResponse;
import app.response.StaffResponse;

public interface StaffService {

    public Staff getAuth() throws Exception;

    public LoginResponse loginStaff(LoginDTO staffDTO) throws Exception;

    public void registerStaff(RegisterStaffDTO staffDTO) throws Exception;

    public List<StaffResponse> getAll();

    public StaffResponse getOne(String email);

    public StaffResponse Post(StaffDTO staffDTO);

    public StaffResponse Put(String email, StaffDTO staffDTO) throws Exception;

    public void Delete(String email) throws Exception;

    public StaffResponse getCurrentStaff() throws Exception;

    public void ChangePassNV(ChangePasswordDTO changePasswordDTO) throws Exception;

}
