package app.service.impl;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import app.dto.AddressDTO;
import app.dto.CustomerInformationRequest;
import app.dto.login.ChangePasswordDTO;
import app.dto.login.LoginDTO;
import app.dto.login.RegisterCustomerDTO;
import app.exception.DataNotFoundException;
import app.exception.InvalidParamException;
import app.jwt.JwtTokenProvider;
import app.model.Address;
import app.model.Customer;
import app.repository.AddressRepository;
import app.repository.CustomerRepository;
import app.response.AddressResponse;
import app.response.CustomerResponse;
import app.response.LoginResponse;
import app.service.CustomerService;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class CustomerServiceImpl implements CustomerService {

    private final AuthenticationManager authenticationManager;
    private final PasswordEncoder passwordEncoder;
    private final JwtTokenProvider jwtTokenProvider;
    private final CustomerRepository customerRepository;
    private final ValidService validService;
    private final FileService fileService;
    private final EmailService emailService;
    private final AddressRepository addressRepository;

    @Override
    public LoginResponse loginCustomer(LoginDTO customer) throws Exception {
        String username = customer.getEmailOrPhoneNumber();
        if (username.contains(" ")) {
            throw new InvalidParamException("Invalid email or phone number");
        }
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(customer.getEmailOrPhoneNumber(), customer.getPassword()));

        SecurityContextHolder.getContext().setAuthentication(authentication);

        String token = jwtTokenProvider.generateToken(authentication);

        // Get roles from Authentication
        List<String> roles = authentication.getAuthorities().stream()
                .map(GrantedAuthority::getAuthority)
                .collect(Collectors.toList());

        return new LoginResponse("Login successfully", token, roles);
    }

    @Override
    public CustomerResponse registerCustomer(RegisterCustomerDTO customerDTO) throws Exception {
        if (customerRepository.existsByEmail(customerDTO.getEmail())) {
            throw new InvalidParamException("Email is already registered");
        }

        String phoneNumber = customerDTO.getPhoneNumber();
        if (!validService.validatePhoneNumber(phoneNumber)) {
            throw new InvalidParamException("Phone number is invalid");
        }

        if (customerRepository.existsByPhoneNumber(phoneNumber)) {
            throw new InvalidParamException("Phone number is already registered");
        }

        String password = customerDTO.getPassword();
        if (!validService.validatePassword(password)) {
            throw new InvalidParamException("Password is invalid");
        }

        if (!customerDTO.getPassword().equals(customerDTO.getRePassword())) {
            throw new InvalidParamException("Password is not match");
        }

        Customer customer = new Customer();
        customer.setEmail(customerDTO.getEmail());
        customer.setPhoneNumber(customerDTO.getPhoneNumber());
        customer.setFullName(customerDTO.getFullName());
        customer.setPassword(passwordEncoder.encode(customerDTO.getPassword()));
        customer.setStatus(true);

        customerRepository.save(customer);
        emailService.sendMail(customer.getEmail(),
                "Chào mừng quý khách",
                """
                        <div
                            style="Margin:0;box-sizing:border-box;color:#183153;font-family:'Cera Round Pro',' Proxima Nova Soft',' Proxima Nova',' Helvetica Neue',Helvetica,Arial,sans-serif;font-size:16px;font-weight:400;line-height:1.5;margin:0;min-width:100%;padding:0;text-align:left;width:100%!important">
                            <span
                                style="color:#f0f1f3;display:none!important;font-size:1px;line-height:1px;max-height:0;max-width:0;opacity:0;overflow:hidden"></span>
                            <table class="m_-169817074034961436body" role="presentation"
                                style="Margin:0;background:#f0f1f3;border-collapse:collapse;border-spacing:0;color:#183153;font-family:'Cera Round Pro',' Proxima Nova Soft',' Proxima Nova',' Helvetica Neue',Helvetica,Arial,sans-serif;font-size:16px;font-weight:400;height:100%;line-height:1.5;margin:0;padding:0;text-align:left;vertical-align:top;width:100%">
                                <tbody>
                                    <tr style="padding:0;text-align:left;vertical-align:top">
                                        <td align="center" valign="top"
                                            style="Margin:0;border-collapse:collapse!important;box-sizing:border-box;color:#183153;font-family:'Cera Round Pro',' Proxima Nova Soft',' Proxima Nova',' Helvetica Neue',Helvetica,Arial,sans-serif;font-size:16px;font-weight:400;line-height:1.5;margin:0;padding:0;text-align:left;vertical-align:top;word-wrap:break-word">
                                            <center style="width:100%">
                                                <table align="center" role="presentation"
                                                    style="Margin:0 auto;border-collapse:collapse;border-spacing:0;float:none;margin:0 auto;padding:0;text-align:center;vertical-align:top;width:100%">
                                                    <tbody>
                                                        <tr style="padding:0;text-align:left;vertical-align:top">
                                                            <td height="24"
                                                                style="Margin:0;border-collapse:collapse!important;box-sizing:border-box;color:#183153;font-family:'Cera Round Pro',' Proxima Nova Soft',' Proxima Nova',' Helvetica Neue',Helvetica,Arial,sans-serif;font-size:24px;font-weight:400;line-height:24px;margin:0;padding:0;text-align:left;vertical-align:top;word-wrap:break-word">
                                                                &nbsp;</td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                                <table align="center" role="presentation"
                                                    style="Margin:0 auto;border-collapse:collapse;border-spacing:0;float:none;margin:0 auto;padding:0;text-align:center;vertical-align:top;width:100%">
                                                    <tbody>
                                                        <tr style="padding:0;text-align:left;vertical-align:top">
                                                            <td
                                                                style="Margin:0;border-collapse:collapse!important;box-sizing:border-box;color:#183153;font-family:'Cera Round Pro',' Proxima Nova Soft',' Proxima Nova',' Helvetica Neue',Helvetica,Arial,sans-serif;font-size:16px;font-weight:400;line-height:1.5;margin:0;padding:0;text-align:left;vertical-align:top;word-wrap:break-word">
                                                                <table align="center"
                                                                    class="m_-169817074034961436container m_-169817074034961436main"
                                                                    role="presentation"
                                                                    style="Margin:0 auto;background:0 0;border-collapse:collapse;border-spacing:0;margin:0 auto;padding:0;text-align:inherit;vertical-align:top;width:580px">
                                                                    <tbody>
                                                                        <tr style="padding:0;text-align:left;vertical-align:top">
                                                                            <td
                                                                                style="Margin:0;border-collapse:collapse!important;box-sizing:border-box;color:#183153;font-family:'Cera Round Pro',' Proxima Nova Soft',' Proxima Nova',' Helvetica Neue',Helvetica,Arial,sans-serif;font-size:16px;font-weight:400;line-height:1.5;margin:0;padding:0;text-align:left;vertical-align:top;word-wrap:break-word">
                                                                                <table class="m_-169817074034961436collapse" role="presentation"
                                                                                    style="border-collapse:collapse;border-spacing:0;display:table;padding:0;text-align:left;vertical-align:top;width:100%">
                                                                                    <tbody>
                                                                                        <tr
                                                                                            style="padding:0;text-align:left;vertical-align:top">
                                                                                            <th class="m_-169817074034961436small-12 m_-169817074034961436columns"
                                                                                                style="Margin:0 auto;border-collapse:collapse!important;box-sizing:border-box;color:#183153;font-family:'Cera Round Pro',' Proxima Nova Soft',' Proxima Nova',' Helvetica Neue',Helvetica,Arial,sans-serif;font-size:16px;font-weight:400;line-height:1.5;margin:0 auto;padding:0;padding-bottom:16px;padding-left:0;padding-right:0;text-align:left;vertical-align:top;width:601px;word-wrap:break-word">
                                                                                                <table role="presentation"
                                                                                                    style="border-collapse:collapse;border-spacing:0;padding:0;text-align:left;vertical-align:top;width:100%">
                                                                                                    <tbody>
                                                                                                        <tr
                                                                                                            style="padding:0;text-align:left;vertical-align:top">
                                                                                                            <th
                                                                                                                style="Margin:0;border-collapse:collapse!important;box-sizing:border-box;color:#183153;font-family:'Cera Round Pro',' Proxima Nova Soft',' Proxima Nova',' Helvetica Neue',Helvetica,Arial,sans-serif;font-size:16px;font-weight:400;line-height:1.5;margin:0;padding:0;text-align:left;vertical-align:top;word-wrap:break-word">
                                                                                                                <h1
                                                                                                                    style="Margin:0;Margin-bottom:10px;color:inherit;font-family:'Cera Round Pro',' Proxima Nova Soft',' Proxima Nova',' Helvetica Neue',Helvetica,Arial,sans-serif;font-size:24px;font-weight:600;letter-spacing:5px;line-height:1.5;margin:0;margin-bottom:0;padding:0;text-align:center;word-wrap:normal;color:darkblue;">
                                                                                                                    CARRENTSG KÍNH CHÀO
                                                                                                                </h1>
                                                                                                                    </th>
                                                                                                                    <th
                                                                                                                        style="Margin:0;border-collapse:collapse!important;box-sizing:border-box;color:#183153;font-family:'Cera Round Pro',' Proxima Nova Soft',' Proxima Nova',' Helvetica Neue',Helvetica,Arial,sans-serif;font-size:16px;font-weight:400;line-height:1.5;margin:0;padding:0!important;text-align:left;vertical-align:top;width:0;word-wrap:break-word">
                                                                                                                    </th>
                                                                                                                </tr>
                                                                                                            </tbody>
                                                                                                        </table>
                                                                                                    </th>
                                                                                                </tr>
                                                                                            </tbody>
                                                                                        </table>
                                                                                    </td>
                                                                                </tr>
                                                                            </tbody>
                                                                        </table>
                                                                    </td>
                                                                </tr>
                                                            </tbody>
                                                        </table>
                                                        <table align="center" class="m_-169817074034961436main" role="presentation"
                                                            style="Margin:0 auto;border-collapse:collapse;border-spacing:0;float:none;margin:0 auto;padding:0;text-align:center;vertical-align:top;width:100%">
                                                            <tbody>
                                                                <tr style="padding:0;text-align:left;vertical-align:top">
                                                                    <td
                                                                        style="Margin:0;border-collapse:collapse!important;box-sizing:border-box;color:#183153;font-family:'Cera Round Pro',' Proxima Nova Soft',' Proxima Nova',' Helvetica Neue',Helvetica,Arial,sans-serif;font-size:16px;font-weight:400;line-height:1.5;margin:0;padding:0;text-align:left;vertical-align:top;word-wrap:break-word">
                                                                        <table align="center" class="m_-169817074034961436container" role="presentation"
                                                                            style="Margin:0 auto;background:#fff;border-collapse:collapse;border-radius:16px;border-spacing:0;margin:0 auto;padding:0;text-align:inherit;vertical-align:top;width:580px">
                                                                            <tbody>
                                                                                <tr style="padding:0;text-align:left;vertical-align:top">
                                                                                    <td
                                                                                        style="Margin:0;border-collapse:collapse!important;box-sizing:border-box;color:#183153;font-family:'Cera Round Pro',' Proxima Nova Soft',' Proxima Nova',' Helvetica Neue',Helvetica,Arial,sans-serif;font-size:16px;font-weight:400;line-height:1.5;margin:0;padding:0;text-align:left;vertical-align:top;word-wrap:break-word">
                                                                                        <table role="presentation"
                                                                                            style="border-collapse:collapse;border-spacing:0;display:table;padding:0;text-align:left;vertical-align:top;width:100%">
                                                                                            <tbody>
                                                                                                <tr
                                                                                                    style="padding:0;text-align:left;vertical-align:top">
                                                                                                    <th class="m_-169817074034961436small-12 m_-169817074034961436columns"
                                                                                                        style="Margin:0 auto;border-collapse:collapse!important;box-sizing:border-box;color:#183153;font-family:'Cera Round Pro',' Proxima Nova Soft',' Proxima Nova',' Helvetica Neue',Helvetica,Arial,sans-serif;font-size:16px;font-weight:400;line-height:1.5;margin:0 auto;padding:0;padding-bottom:32px;padding-left:42px;padding-right:42px;text-align:left;vertical-align:top;width:538px;word-wrap:break-word">
                                                                                                        <table role="presentation"
                                                                                                            style="border-collapse:collapse;border-spacing:0;padding:0;text-align:left;vertical-align:top;width:100%">
                                                                                                            <tbody>
                                                                                                                <tr
                                                                                                                    style="padding:0;text-align:left;vertical-align:top">
                                                                                                                    <th
                                                                                                                        style="Margin:0;border-collapse:collapse!important;box-sizing:border-box;color:#183153;font-family:'Cera Round Pro',' Proxima Nova Soft',' Proxima Nova',' Helvetica Neue',Helvetica,Arial,sans-serif;font-size:16px;font-weight:400;line-height:1.5;margin:0;padding:0;text-align:left;vertical-align:top;word-wrap:break-word">
                                                                                                                        <table role="presentation"
                                                                                                                            style="border-collapse:collapse;border-spacing:0;padding:0;text-align:left;vertical-align:top;width:100%">
                                                                                                                            <tbody>
                                                                                                                                <tr
                                                                                                                                    style="padding:0;text-align:left;vertical-align:top">
                                                                                                                                    <td height="42"
                                                                                                                                        style="Margin:0;border-collapse:collapse!important;box-sizing:border-box;color:#183153;font-family:'Cera Round Pro',' Proxima Nova Soft',' Proxima Nova',' Helvetica Neue',Helvetica,Arial,sans-serif;font-size:42px;font-weight:400;line-height:42px;margin:0;padding:0;text-align:left;vertical-align:top;word-wrap:break-word">
                                                                                                                                        &nbsp;</td>
                                                                                                                                </tr>
                                                                                                                            </tbody>
                                                                                                                        </table>
                                                                                                                        <div
                                                                                                                            style="text-align: center;">
                                                                                                                            <a href="#"
                                                                                                                                style="color:#1c7ed6;font-family:'Cera Round Pro',' Proxima Nova Soft',' Proxima Nova',' Helvetica Neue',Helvetica,Arial,sans-serif;font-weight:400;line-height:1.5;padding:0;text-decoration:underline"
                                                                                                                                target="_blank"
                                                                                                                                data-saferedirecturl="https://www.google.com/url?q=https://www.kickstarter.com/projects/fontawesome/web-awesome?ref%3Dbawnh2&amp;source=gmail&amp;ust=1718290981703000&amp;usg=AOvVaw12anzjyCvJMJVaD6XAInc2">
                                                                                                                                <img src="https://firebasestorage.googleapis.com/v0/b/fir-test-15d04.appspot.com/o/ba99588c-d7a9-4d2d-bd56-db6d0b3c2620.png?alt=media"
                                                                                                                                    alt="CarRentSG"
                                                                                                                                    style="clear:none;display:inline-block;max-width:100%;outline:0;text-decoration:none;width:200px"
                                                                                                                                    class="CToWUd"
                                                                                                                                    data-bit="iit">
                                                                                                                            </a>
                                                                                                                        </div>

                                                                                                                        <table role="presentation"
                                                                                                                            style="border-collapse:collapse;border-spacing:0;padding:0;text-align:left;vertical-align:top;width:100%">
                                                                                                                            <tbody>
                                                                                                                                <tr
                                                                                                                                    style="padding:0;text-align:left;vertical-align:top">
                                                                                                                                    <td height="16"
                                                                                                                                        style="Margin:0;border-collapse:collapse!important;box-sizing:border-box;color:#183153;font-family:'Cera Round Pro',' Proxima Nova Soft',' Proxima Nova',' Helvetica Neue',Helvetica,Arial,sans-serif;font-size:16px;font-weight:400;line-height:16px;margin:0;padding:0;text-align:left;vertical-align:top;word-wrap:break-word">
                                                                                                                                        &nbsp;</td>
                                                                                                                                </tr>
                                                                                                                            </tbody>
                                                                                                                        </table>

                                                                                                                        <p
                                                                                                                            style="Margin:0;Margin-bottom:10px;color:#183153;font-family:'Cera Round Pro',' Proxima Nova Soft',' Proxima Nova',' Helvetica Neue',Helvetica,Arial,sans-serif;font-size:16px;font-weight:400;line-height:1.5;margin:0;margin-bottom:10px;padding:0;text-align:left">
                                                                                                                            Chào mừng
                                                                                                                            """
                        + " " +
                        """
                                """
                        +
                        customerDTO.getFullName()
                        +
                        """
                                                                                                                            </p>

                                                                                                                        <table role="presentation"
                                                                                                                            style="border-collapse:collapse;border-spacing:0;padding:0;text-align:left;vertical-align:top;width:100%">
                                                                                                                            <tbody>
                                                                                                                                <tr
                                                                                                                                    style="padding:0;text-align:left;vertical-align:top">
                                                                                                                                    <td height="8"
                                                                                                                                        style="Margin:0;border-collapse:collapse!important;box-sizing:border-box;color:#183153;font-family:'Cera Round Pro',' Proxima Nova Soft',' Proxima Nova',' Helvetica Neue',Helvetica,Arial,sans-serif;font-size:8px;font-weight:400;line-height:8px;margin:0;padding:0;text-align:left;vertical-align:top;word-wrap:break-word">
                                                                                                                                        &nbsp;</td>
                                                                                                                                </tr>
                                                                                                                            </tbody>
                                                                                                                        </table>

                                                                                                                        <p
                                                                                                                            style="Margin:0;Margin-bottom:10px;color:#183153;font-family:'Cera Round Pro',' Proxima Nova Soft',' Proxima Nova',' Helvetica Neue',Helvetica,Arial,sans-serif;font-size:16px;font-weight:400;line-height:1.5;margin:0;margin-bottom:10px;padding:0;text-align:left">
                                                                                                                            Đây có vẻ là lần đầu tiên
                                                                                                                            quý khách đến với trang web
                                                                                                                            cho thuê xe ô tô CarRentSG
                                                                                                                            của chúng tôi. Chúc quý
                                                                                                                            khách có những trải nghiệm
                                                                                                                            tốt nhất khi sử dụng trang
                                                                                                                            web.</p>

                                                                                                                        <table role="presentation"
                                                                                                                            style="border-collapse:collapse;border-spacing:0;padding:0;text-align:left;vertical-align:top;width:100%">
                                                                                                                            <tbody>
                                                                                                                                <tr
                                                                                                                                    style="padding:0;text-align:left;vertical-align:top">
                                                                                                                                    <td height="16"
                                                                                                                                        style="Margin:0;border-collapse:collapse!important;box-sizing:border-box;color:#183153;font-family:'Cera Round Pro',' Proxima Nova Soft',' Proxima Nova',' Helvetica Neue',Helvetica,Arial,sans-serif;font-size:16px;font-weight:400;line-height:16px;margin:0;padding:0;text-align:left;vertical-align:top;word-wrap:break-word">
                                                                                                                                        &nbsp;</td>
                                                                                                                                </tr>
                                                                                                                            </tbody>
                                                                                                                        </table>

                                                                                                                        <table role="presentation"
                                                                                                                            style="border-collapse:collapse;border-spacing:0;padding:0;text-align:left;vertical-align:top;width:100%">
                                                                                                                            <tbody>
                                                                                                                                <tr
                                                                                                                                    style="padding:0;text-align:left;vertical-align:top">
                                                                                                                                    <th
                                                                                                                                        style="Margin:0;border-bottom:3px solid #f0f1f3;border-collapse:collapse!important;border-left:0;border-right:0;border-top:0;box-sizing:border-box;clear:both;color:#183153;font-family:'Cera Round Pro',' Proxima Nova Soft',' Proxima Nova',' Helvetica Neue',Helvetica,Arial,sans-serif;font-size:0;font-weight:400;height:0;line-height:0;margin:0;padding:0;padding-bottom:0;padding-top:0;text-align:center;vertical-align:top;width:580px;word-wrap:break-word">
                                                                                                                                        &nbsp;</th>
                                                                                                                                </tr>
                                                                                                                            </tbody>
                                                                                                                        </table>
                                                                                                                        <table role="presentation"
                                                                                                                            style="border-collapse:collapse;border-spacing:0;padding:0;text-align:left;vertical-align:top;width:100%">
                                                                                                                            <tbody>
                                                                                                                                <tr
                                                                                                                                    style="padding:0;text-align:left;vertical-align:top">
                                                                                                                                    <td height="16"
                                                                                                                                        style="Margin:0;border-collapse:collapse!important;box-sizing:border-box;color:#183153;font-family:'Cera Round Pro',' Proxima Nova Soft',' Proxima Nova',' Helvetica Neue',Helvetica,Arial,sans-serif;font-size:16px;font-weight:400;line-height:16px;margin:0;padding:0;text-align:left;vertical-align:top;word-wrap:break-word">
                                                                                                                                        &nbsp;</td>
                                                                                                                                </tr>
                                                                                                                            </tbody>
                                                                                                                        </table>
                                                                                                                    </th>
                                                                                                                </tr>
                                                                                                            </tbody>
                                                                                                        </table>
                                                                                                    </th>
                                                                                                </tr>
                                                                                            </tbody>
                                                                                        </table>
                                                                                    </td>
                                                                                </tr>
                                                                            </tbody>
                                                                        </table>
                                                                    </td>
                                                                </tr>
                                                            </tbody>
                                                        </table>
                                                        <table align="center" role="presentation"
                                                            style="Margin:0 auto;border-collapse:collapse;border-spacing:0;float:none;margin:0 auto;padding:0;text-align:center;vertical-align:top;width:100%">
                                                            <tbody>
                                                                <tr style="padding:0;text-align:left;vertical-align:top">
                                                                    <td height="32"
                                                                        style="Margin:0;border-collapse:collapse!important;box-sizing:border-box;color:#183153;font-family:'Cera Round Pro',' Proxima Nova Soft',' Proxima Nova',' Helvetica Neue',Helvetica,Arial,sans-serif;font-size:32px;font-weight:400;line-height:32px;margin:0;padding:0;text-align:left;vertical-align:top;word-wrap:break-word">
                                                                        &nbsp;</td>
                                                                </tr>
                                                            </tbody>
                                                        </table>
                                                        <table align="center" role="presentation"
                                                            style="Margin:0 auto;border-collapse:collapse;border-spacing:0;float:none;margin:0 auto;padding:0;text-align:center;vertical-align:top;width:100%">
                                                            <tbody>
                                                                <tr style="padding:0;text-align:left;vertical-align:top">
                                                                    <td
                                                                        style="Margin:0;border-collapse:collapse!important;box-sizing:border-box;color:#183153;font-family:'Cera Round Pro',' Proxima Nova Soft',' Proxima Nova',' Helvetica Neue',Helvetica,Arial,sans-serif;font-size:16px;font-weight:400;line-height:1.5;margin:0;padding:0;text-align:left;vertical-align:top;word-wrap:break-word">
                                                                        <table align="center" class="m_-169817074034961436container" role="presentation"
                                                                            style="Margin:0 auto;background:0 0;background-color:#f0f1f3;border-collapse:collapse;border-spacing:0;margin:0 auto;padding:0;text-align:inherit;vertical-align:top;width:580px">
                                                                            <tbody>
                                                                                <tr style="padding:0;text-align:left;vertical-align:top">
                                                                                    <td
                                                                                        style="Margin:0;border-collapse:collapse!important;box-sizing:border-box;color:#183153;font-family:'Cera Round Pro',' Proxima Nova Soft',' Proxima Nova',' Helvetica Neue',Helvetica,Arial,sans-serif;font-size:16px;font-weight:400;line-height:1.5;margin:0;padding:0;text-align:left;vertical-align:top;word-wrap:break-word">
                                                                                        <table class="m_-169817074034961436collapse" role="presentation"
                                                                                            style="border-collapse:collapse;border-spacing:0;display:table;padding:0;text-align:left;vertical-align:top;width:100%">
                                                                                            <tbody>
                                                                                                <tr
                                                                                                    style="padding:0;text-align:left;vertical-align:top">
                                                                                                    <td>
                                                                                                        <p
                                                                                                            style="Margin:0;Margin-bottom:10px;color:#8991a5;font-family:'Cera Round Pro',' Proxima Nova Soft',' Proxima Nova',' Helvetica Neue',Helvetica,Arial,sans-serif;font-size:.9rem;font-weight:400;line-height:1.5;margin:0;margin-bottom:10px;padding:0;text-align:center">
                                                                                                            <a href=""
                                                                                                                style="Margin:default;color:#1c7ed6;font-family:'Cera Round Pro',' Proxima Nova Soft',' Proxima Nova',' Helvetica Neue',Helvetica,Arial,sans-serif;font-weight:400;line-height:1.5;margin:default;padding:0;text-align:left;text-decoration:underline"
                                                                                                                target="_blank"
                                                                                                                data-saferedirecturl="https://www.google.com/url?q=https://fontawesome.com&amp;source=gmail&amp;ust=1718290981703000&amp;usg=AOvVaw1QZBtkALPGJQmy3s67vGke">
                                                                                                                <img style="border:none;clear:both;display:block;height:32px;margin:0 auto;max-width:100%;outline:0;text-decoration:none;width:32px"
                                                                                                                    src="https://ci3.googleusercontent.com/meips/ADKq_NYryS-akOU_QkJIQDWWbgz3lX4WApsYxRLstnUlH8cVfdX1h7Gt-A2xWT_Ivelo8VKbsrViooiCQEIgKnejGNtIb_XD7pYGeZbp2g_8be7lpdILFc8JeA=s0-d-e1-ft#https://img.fortawesome.com/07dde85b/font-awesome-email-badge.png"
                                                                                                                    width="32" height="32"
                                                                                                                    alt="Font Awesome" class="CToWUd"
                                                                                                                    data-bit="iit">
                                                                                                            </a>
                                                                                                        </p>
                                                                                                        <p
                                                                                                            style="Margin:0;Margin-bottom:10px;color:#8991a5;font-family:'Cera Round Pro',' Proxima Nova Soft',' Proxima Nova',' Helvetica Neue',Helvetica,Arial,sans-serif;font-size:.9rem;font-weight:400;line-height:1.5;margin:0;margin-bottom:10px;padding:0;text-align:center">
                                                                                                            <span class="il">CarRent</span>
                                                                                                            <span class="il">SG</span>
                                                                                                        </p>
                                                                                                    </td>
                                                                                                </tr>
                                                                                            </tbody>
                                                                                        </table>
                                                                                    </td>
                                                                                </tr>
                                                                            </tbody>
                                                                        </table>
                                                                    </td>
                                                                </tr>
                                                            </tbody>
                                                        </table>
                                                    </center>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                                                        """);
        return CustomerResponse.registerCustomer(customer);
    }

    @Override
    public Customer getAuth() throws Exception {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String username = authentication.getName();
        Customer customer = customerRepository
                .findByUsernameOrPhoneNumberOrEmailAndStatusTrue(username, username, username)
                .orElseThrow(() -> new UsernameNotFoundException("Customer not found"));
        return customer;
    }

    @Override
    public List<CustomerResponse> getAllCustomer() {
        List<Customer> customers = customerRepository.findAll();
        return customers.stream().map(CustomerResponse::fromCustomer).toList();
    }

    @Override
    public List<CustomerResponse> getAllAndStatusFalse() {
        List<Customer> customers = customerRepository.findByStatusFalse();
        return customers.stream().map(CustomerResponse::fromCustomer).toList();
    }

    @Override
    public List<CustomerResponse> getAllAndStatusTrue() {
        List<Customer> customers = customerRepository.findByStatusTrue();
        return customers.stream().map(CustomerResponse::fromCustomer).toList();
    }

    @Override
    public CustomerResponse updateCustomerInfo(CustomerInformationRequest customerDTO) throws Exception {
        Customer customer = getAuth();
        customer.setFullName(customerDTO.getFullName() == null ? customer.getFullName()
                : customerDTO.getFullName());
        customer.setGender(customerDTO.getGender() == null ? customer.getGender()
                : customerDTO.getGender());
        customer.setBirthDate(customerDTO.getBirthDate());
        return CustomerResponse.fromCustomer(customerRepository.save(customer));
    }

    @Override
    public void deleteCustomer(String phoneNumber) throws Exception {
        Customer customer = customerRepository.findByPhoneNumber(phoneNumber);
        if (customer == null) {
            throw new DataNotFoundException("Not found customer with phone number " + phoneNumber);
        }
        customer.setStatus(false);
        customerRepository.save(customer);
    }

    @Override
    public void recoverCustomer(String phoneNumber) throws Exception {
        Customer customer = customerRepository.findByPhoneNumber(phoneNumber);
        if (customer == null) {
            throw new DataNotFoundException("Not found customer with phone number " + phoneNumber);
        }
        customer.setStatus(true);
        customerRepository.save(customer);
    }

    @Override
    public void changePassword(ChangePasswordDTO changePasswordDTO) throws Exception {
        Customer customer = getAuth();
        String oldPass = changePasswordDTO.getOldPassword();
        if (!passwordEncoder.matches(oldPass, customer.getPassword())) {
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
        customer.setPassword(passwordEncoder.encode(newPass));
        customerRepository.save(customer);
    }

    @Override
    public CustomerResponse getOneByPhoneNumber(String phoneNumber) throws Exception {
        Customer customer = customerRepository.findByPhoneNumber(phoneNumber);
        return CustomerResponse.fromCustomer(customer);
    }

    @Override
    public CustomerResponse getCurrentCustomer() throws Exception {
        return CustomerResponse.fromCustomer(getAuth());
    }

    @Override
    public long countCustomer() {
        return customerRepository.countCustomerTrue();
    }

    @Override
    public CustomerResponse updateCustomerPhoneNumber(String phoneNumber) throws Exception {
        Customer customer = getAuth();
        if (!validService.validatePhoneNumber(phoneNumber)) {
            throw new InvalidParamException("Phone number is invalid");
        }
        if (customerRepository.existsByPhoneNumberAndCustomerIdNot(phoneNumber, customer.getCustomerId())) {
            throw new InvalidParamException("Phone number is already in use");
        }
        customer.setPhoneNumber(phoneNumber == null ? customer.getPhoneNumber()
                : phoneNumber);
        return CustomerResponse.fromCustomer(customerRepository.save(customer));
    }

    @Override
    public CustomerResponse updateCustomerEmail(String email) throws Exception {
        Customer customer = getAuth();
        if (customerRepository.existsByEmailAndCustomerIdNot(email, customer.getCustomerId())) {
            throw new InvalidParamException("Email is already in use");
        }
        customer.setEmail(email == null ? customer.getEmail()
                : email);
        return CustomerResponse.fromCustomer(customerRepository.save(customer));
    }

    @Override
    public CustomerResponse updateCustomerAvatar(MultipartFile avatar) throws Exception {
        Customer customer = getAuth();
        customer.setAvatarImage(fileService.upload(avatar) == null ? customer.getAvatarImage()
                : fileService.upload(avatar));
        return CustomerResponse.fromCustomer(customerRepository.save(customer));
    }

    @Override
    public AddressResponse updateCustomerAddress(AddressDTO addressDTO) throws Exception {
        Customer customer = getAuth();
        String province = addressDTO.getProvince();
        String district = addressDTO.getDistrict();
        String ward = addressDTO.getWard();
        String street = addressDTO.getStreet();
        String rememberName = addressDTO.getRememberName();
        Address address = addressRepository.findByProvinceAndDistrictAndWardAndStreetAndRememberName(
                province, district,
                ward, street,
                rememberName);
        if (address == null) {
            address = new Address(province, district, ward, street, rememberName);
        }
        try {
            customer.setAddress(addressRepository.save(address));
            customerRepository.save(customer);
        } catch (Exception e) {
            throw new InvalidParamException("Could not save!");
        }
        return AddressResponse.fromResponse(address);
    }

}
