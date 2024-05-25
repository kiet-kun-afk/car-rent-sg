package app.service.impl;

import java.util.HashSet;
import java.util.Set;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import app.dto.login.LoginDTO;
import app.dto.login.RegisterStaffDTO;
import app.exception.InvalidParamException;
import app.jwt.JwtTokenProvider;
import app.model.Role;
import app.model.Staff;
import app.repository.RoleRepository;
import app.repository.StaffRepository;
import app.response.LoginResponse;
import app.response.StaffResponse;
import app.service.StaffService;
import lombok.RequiredArgsConstructor;

/**
 * StaffServiceImpl
 * Version: 1.0
 * Date: 5/25/2024
 * Modification Logs
 * DATE AUTHOR DESCRIPTION
 * -------------------------------------
 * 5/25/2024 kiet-kun-afk Create
 */
@Service
@RequiredArgsConstructor
public class StaffServiceImpl implements StaffService {

    private final AuthenticationManager authenticationManager;
    private final PasswordEncoder passwordEncoder;
    private final JwtTokenProvider jwtTokenProvider;
    private final StaffRepository staffRepository;
    private final RoleRepository roleRepository;

    @Override
    public LoginResponse loginStaff(LoginDTO loginDTO) throws Exception {

        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(loginDTO.getEmailOrPhoneNumber(), loginDTO.getPassword()));

        SecurityContextHolder.getContext().setAuthentication(authentication);

        return new LoginResponse("Login successfully", jwtTokenProvider.generateToken(authentication));
    }

    @Override
    public StaffResponse registerStaff(RegisterStaffDTO staffDTO) throws Exception {

        if (staffRepository.existsByEmail(staffDTO.getEmail())) {
            throw new InvalidParamException("Email is already registered");
        }

        if (staffRepository.existsByPhoneNumber(staffDTO.getPhoneNumber())) {
            throw new InvalidParamException("Phone number is already registered");
        }

        Staff staff = new Staff();
        staff.setEmail(staffDTO.getEmail());
        staff.setPhoneNumber(staffDTO.getPhoneNumber());
        staff.setPassword(passwordEncoder.encode(staffDTO.getPhoneNumber()));
        staff.setRoles(getRoles(staffDTO.getRoles()));

        staffRepository.save(staff);
        return StaffResponse.registerStaff(staff);
    }

    private Set<Role> getRoles(Set<String> rolesString) {
        Set<Role> roles = new HashSet<>();
        if (rolesString == null || rolesString.isEmpty()) {
            // Thêm vai trò mặc định nếu rolesString là null hoặc rỗng
            Role defaultRole = roleRepository.findByName("STAFF_ROLE");
            if (defaultRole == null) {
                defaultRole = new Role("STAFF_ROLE");
                roleRepository.save(defaultRole);
            }
            roles.add(defaultRole);
        } else {
            for (String roleName : rolesString) {
                // Tìm vai trò trong cơ sở dữ liệu theo tên
                Role role = roleRepository.findByName(roleName);

                if (role == null) {
                    // Nếu không tìm thấy, tạo vai trò mới và lưu vào cơ sở dữ liệu
                    role = new Role(roleName);
                    roleRepository.save(role);
                }

                // Thêm vai trò vào tập hợp kết quả
                roles.add(role);
            }
        }
        return roles;
    }

}
