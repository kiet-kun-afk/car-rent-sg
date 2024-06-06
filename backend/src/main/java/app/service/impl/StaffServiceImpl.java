package app.service.impl;

import java.util.HashSet;
import java.util.List;
// import java.util.Optional;
import java.util.Set;
import java.util.UUID;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import app.dto.StaffDTO;
import app.dto.login.LoginDTO;
import app.dto.login.RegisterStaffDTO;
import app.exception.DataNotFoundException;
import app.exception.InvalidParamException;
import app.jwt.JwtTokenProvider;
import app.model.Address;
import app.model.Role;
import app.model.Staff;
import app.model.cards.CitizenCard;
import app.repository.AddressRepository;
import app.repository.CitizencardRepository;
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
    private final JwtTokenProvider jwtTokenProvider;
    private final StaffRepository staffRepository;
    private final RoleRepository roleRepository;
    private final AddressRepository addressRepository;
    private final CitizencardRepository citizenRepository;
    private final ValidService validService;
    private final PasswordResetService passwordResetService;

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

        String phoneNumber = staffDTO.getPhoneNumber();
        if (!validService.validatePhoneNumber(phoneNumber)) {
            throw new InvalidParamException("Phone number is not valid");
        }

        if (staffRepository.existsByPhoneNumber(phoneNumber)) {
            throw new InvalidParamException("Phone number is already registered");
        }

        Staff staff = new Staff();
        staff.setEmail(staffDTO.getEmail());
        staff.setPhoneNumber(staffDTO.getPhoneNumber());
        staff.setPassword(UUID.randomUUID().toString());
        staff.setRoles(getRoles(staffDTO.getRoles()));
        staff.setStatus(true);

        staffRepository.save(staff);
        passwordResetService.createPasswordResetToken(staff.getEmail(), "staff", "first");
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

    // curd

    @Override
    public List<StaffResponse> getAll() {
        return staffRepository.findAll().stream().map(StaffResponse::fromStaff).toList();
    }

    @Override
    public StaffResponse getOne(String email) {
        Staff staff = staffRepository.findByEmail(email).orElse(null);
        return StaffResponse.fromStaff(staff);
    }

    @Override
    public StaffResponse Post(StaffDTO staffDTO) {

        Address address = addressRepository.findById(staffDTO.getAddress()).orElse(null);
        CitizenCard citizencard = citizenRepository.findById(staffDTO.getCitizenCard()).orElse(null);

        Staff staff = new Staff();

        staff.setAvatarImage(staffDTO.getAvatarImage());
        staff.setBirthDate(staffDTO.getBirthDate());
        staff.setEmail(staffDTO.getEmail());
        // staff.setFirstName(staffDTO.getFirstName());
        staff.setGender(staffDTO.getGender());
        staff.setRoles(getRoles(staffDTO.getRoles()));
        // staff.setLastName(staffDTO.getLastName());
        staff.setPhoneNumber(staffDTO.getPhoneNumber());
        staff.setPassword(staffDTO.getPassword());
        staff.setStatus(staffDTO.getStatus());
        staff.setAddress(address);
        staff.setCitizenCard(citizencard);

        staffRepository.save(staff);

        return StaffResponse.fromStaff(staff);

    }

    @Override
    public StaffResponse Put(String email, StaffDTO staffDTO) throws Exception {
        // TODO Auto-generated method stub
        Address address = addressRepository.findById(staffDTO.getAddress()).orElse(null);
        CitizenCard citizencard = citizenRepository.findById(staffDTO.getCitizenCard()).orElse(null);

        Staff staff = staffRepository.findByEmail(email)
                .orElseThrow(() -> new DataNotFoundException("staff not found"));

        staff.setAvatarImage(staffDTO.getAvatarImage());
        staff.setBirthDate(staffDTO.getBirthDate());
        staff.setEmail(staffDTO.getEmail());
        // staff.setFirstName(staffDTO.getFirstName());
        staff.setGender(staffDTO.getGender());
        staff.setRoles(getRoles(staffDTO.getRoles()));
        // staff.setLastName(staffDTO.getLastName());
        staff.setPhoneNumber(staffDTO.getPhoneNumber());
        staff.setPassword(staffDTO.getPassword());
        staff.setStatus(staffDTO.getStatus());
        staff.setAddress(address);
        staff.setCitizenCard(citizencard);
        staffRepository.save(staff);
        return StaffResponse.fromStaff(staff);

    }

    @Override
    public void Delete(String email) throws Exception {
        // TODO Auto-generated method stub
        Staff staff = staffRepository.findByEmailAndStatusTrue(email);
        if (staff == null) {
            throw new DataNotFoundException("Couldn't find staff");
        }
        staff.setStatus(false);
        staffRepository.save(staff);

    }

    @Override
    public Staff getAuth() {
        String email = SecurityContextHolder.getContext().getAuthentication().getName();
        Staff staff = staffRepository.findByEmailAndStatusTrue(email);
        return staff;
    }

}
