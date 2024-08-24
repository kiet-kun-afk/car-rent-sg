package app.service.impl;

import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.UUID;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import app.dto.StaffDTO;
import app.dto.login.ChangePasswordDTO;
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
import app.repository.CitizenCardRepository;
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

    @Value("${staff.role}")
    private String staffRole;

    private final AuthenticationManager authenticationManager;
    private final JwtTokenProvider jwtTokenProvider;
    private final StaffRepository staffRepository;
    private final RoleRepository roleRepository;
    private final AddressRepository addressRepository;
    private final CitizenCardRepository citizenRepository;
    private final ValidService validService;
    private final PasswordEncoder passwordEncoder;
    private final EmailService emailService;

    @Autowired
    FileService fileService;

    @Override
    public LoginResponse loginStaff(LoginDTO loginDTO) throws Exception {

        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(loginDTO.getEmailOrPhoneNumber(), loginDTO.getPassword()));

        SecurityContextHolder.getContext().setAuthentication(authentication);

        String token = jwtTokenProvider.generateToken(authentication);

        // Get roles from Authentication
        List<String> roles = authentication.getAuthorities().stream()
                .map(GrantedAuthority::getAuthority)
                .collect(Collectors.toList());

        return new LoginResponse("Login successfully", token, roles);
    }

    @Override
    public void registerStaff(RegisterStaffDTO staffDTO) throws Exception {

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

        String rawPassword = "NV" + UUID.randomUUID().toString().replace("-", "").substring(0, 8);

        Staff staff = new Staff();
        staff.setEmail(staffDTO.getEmail());
        staff.setPhoneNumber(staffDTO.getPhoneNumber());
        staff.setPassword(passwordEncoder.encode(rawPassword));
        staff.setRoles(getRoles(staffRole));
        staff.setBirthDate(staffDTO.getBirthday());
        staff.setFullName(staffDTO.getFullname());
        if (staffDTO.getAvatarImg() == null) {
            staff.setAvatarImage(null);
        } else {
            staff.setAvatarImage(fileService.upload(staffDTO.getAvatarImg()));
        }
        staff.setGender(staffDTO.isGender());
        staff.setStatus(true);
        String province = staffDTO.getProvince();
        String district = staffDTO.getDistrict();
        String ward = staffDTO.getWard();
        String street = staffDTO.getStreet();
        Address address = addressRepository.findByProvinceAndDistrictAndWardAndStreet(
                province, district,
                ward, street);
        if (address == null) {
            address = new Address(province, district, ward, street);
        }
        address.setStreet(street);
        address.setDistrict(district);
        address.setProvince(province);
        address.setWard(ward);
        CitizenCard citizenCard = new CitizenCard();
        if (staffDTO.getBackSide() == null) {
            throw new Exception("Back side citizen is required");
        } else {
            citizenCard.setBackImage(fileService.upload(staffDTO.getBackSide()));
        }
        if (staffDTO.getFrontSide() == null) {
            throw new Exception("Front side citizen is required");
        } else {
            citizenCard.setFrontImage(fileService.upload(staffDTO.getFrontSide()));
        }
        if (citizenRepository.existsByIdCard(staffDTO.getIdCard())) {
            throw new Exception("Id card is already exists");
        } else {
            citizenCard.setIdCard(staffDTO.getIdCard());
        }
        citizenCard.setIssueDate(staffDTO.getIssueDate());
        citizenCard.setExpiryDate(staffDTO.getExpiryDate());
        try {
            address = addressRepository.save(address);
            citizenCard = citizenRepository.save(citizenCard);
            staff.setAddress(address);
            staff.setCitizenCard(citizenCard);
            staffRepository.save(staff);
            emailService.sendMail(staff.getEmail(), "Thông báo mật khẩu của nhân viên", rawPassword);
        } catch (Exception e) {
            throw new Exception("Error when save staff and address");
        }

    }

    private Set<Role> getRoles(String rolesString) {
        Set<Role> roles = new HashSet<>();
        if (rolesString == null || rolesString.isEmpty()) {
            // Thêm vai trò mặc định nếu rolesString là null hoặc rỗng
            Role defaultRole = roleRepository.findByName(staffRole);
            if (defaultRole == null) {
                defaultRole = new Role(staffRole);
                roleRepository.save(defaultRole);
            }
            roles.add(defaultRole);
        } else {
            // Tìm vai trò trong cơ sở dữ liệu theo tên
            Role role = roleRepository.findByName(rolesString);

            if (role == null) {
                // Nếu không tìm thấy, tạo vai trò mới và lưu vào cơ sở dữ liệu
                role = new Role(rolesString);
                roleRepository.save(role);
            }

            // Thêm vai trò vào tập hợp kết quả
            roles.add(role);
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

        staff.setGender(staffDTO.getGender());
        staff.setRoles(getRoles(staffRole));

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

        Address address = addressRepository.findById(staffDTO.getAddress()).orElse(null);
        CitizenCard citizencard = citizenRepository.findById(staffDTO.getCitizenCard()).orElse(null);

        Staff staff = staffRepository.findByEmail(email)
                .orElseThrow(() -> new DataNotFoundException("staff not found"));

        staff.setAvatarImage(staffDTO.getAvatarImage());
        staff.setBirthDate(staffDTO.getBirthDate());
        staff.setEmail(staffDTO.getEmail());
        // staff.setFirstName(staffDTO.getFirstName());
        staff.setGender(staffDTO.getGender());
        staff.setRoles(getRoles(staffRole));
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

        Staff staff = staffRepository.findByEmailAndStatusTrue(email);
        if (staff == null) {
            throw new DataNotFoundException("Couldn't find staff");
        }
        staff.setStatus(false);
        staffRepository.save(staff);

    }

    @Override
    public Staff getAuth() throws Exception {
        String email = SecurityContextHolder.getContext().getAuthentication().getName();
        Staff staff = staffRepository.findByEmailAndStatusTrue(email);
        if (staff == null) {
            throw new DataNotFoundException("Staff not found");
        }
        return staff;
    }

    @Override
    public StaffResponse getCurrentStaff() throws Exception {
        return StaffResponse.fromStaff(getAuth());
    }

    @Override
    public void ChangePassNV(ChangePasswordDTO changePasswordDTO) throws Exception {
        Staff staff = getAuth();
        String oldPass = changePasswordDTO.getOldPassword();
        if (!passwordEncoder.matches(oldPass, staff.getPassword())) {
            throw new InvalidParamException("Old password is not match");
        }
        String newPass = changePasswordDTO.getNewPassword();
        if (!validService.validatePassword(newPass)) {
            throw new InvalidParamException("Invalid password");
        }
        String confirmPass = changePasswordDTO.getConfirmNewPassword();
        if (!newPass.equals(confirmPass)) {
            throw new InvalidParamException("Re-enter the password does not match");
        }
        staff.setPassword(passwordEncoder.encode(newPass));
        staffRepository.save(staff);
    }

}
