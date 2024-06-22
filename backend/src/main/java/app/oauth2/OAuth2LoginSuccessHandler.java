package app.oauth2;

import java.io.IOException;
import java.util.UUID;

import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.authentication.SavedRequestAwareAuthenticationSuccessHandler;
import org.springframework.stereotype.Component;

import app.jwt.JwtTokenProvider;
import app.model.Customer;
import app.repository.CustomerRepository;
import app.service.impl.EmailService;
import jakarta.mail.MessagingException;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class OAuth2LoginSuccessHandler extends SavedRequestAwareAuthenticationSuccessHandler {

    private final CustomerRepository customerRepository;
    private final JwtTokenProvider jwtTokenProvider;
    private final PasswordEncoder passwordEncoder;
    private final EmailService emailService;

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response,
            Authentication authentication) throws ServletException, IOException {

        CustomOAuth2User oauth2User = (CustomOAuth2User) authentication.getPrincipal();

        String name = oauth2User.getName();
        String email = oauth2User.getEmail();
        String fullname = oauth2User.getFullname();
        String photo = oauth2User.getPhoto();

        Customer customer = customerRepository.findByEmail(email);
        if (customer != null) {
            customer.setUsername(name);
            customer.setFullName(customer.getFullName() == null ? fullname : customer.getFullName());
            customer.setStatus(true);
            customer.setAvatarImage(customer.getAvatarImage() == null ? photo : customer.getAvatarImage());
            customerRepository.save(customer);
        } else {
            customer = new Customer();
            String rawPassword = UUID.randomUUID().toString();
            customer.setUsername(name);
            customer.setEmail(email);
            customer.setPhoneNumber("NoT uPdAtEd ! ! !");
            customer.setPassword(passwordEncoder.encode(rawPassword));
            customer.setStatus(true);
            customer.setFullName(fullname);
            customer.setAvatarImage(photo);
            customerRepository.save(customer);
            try {
                emailService.sendMail(email, fullname == null ? name : fullname, rawPassword);
            } catch (MessagingException e) {
                e.printStackTrace();
            }
        }

        // generate JWT token and add into response
        String token = jwtTokenProvider.generateToken(authentication);
        String redirectUrl = "http://localhost:3000/oauth2/redirect?token=" + token;

        getRedirectStrategy().sendRedirect(request, response, redirectUrl);
    }
}
