package app.oauth2;

import java.io.IOException;
import java.util.UUID;

import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.oauth2.core.user.OAuth2User;
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

        OAuth2User oauth2User = (OAuth2User) authentication.getPrincipal();
        String clientName = "Google";
        GoogleOAuth2UserInfo user = new GoogleOAuth2UserInfo(oauth2User, clientName);

        String name = oauth2User.getName();
        String email = user.getEmail();
        String fullname = user.getFullname();
        String photo = user.getImageUrl();

        Customer customer = customerRepository.findByEmail(email);
        if (customer != null) {
            customer.setUsername(name);
            customer.setFullName(fullname);
            customer.setStatus(true);
            customer.setAvatarImage(photo);
            customerRepository.save(customer);
        } else {
            customer = new Customer();
            String rawPassword = UUID.randomUUID().toString();
            customer.setUsername(name);
            customer.setEmail(email);
            customer.setPhoneNumber("Not updated");
            customer.setPassword(passwordEncoder.encode(rawPassword));
            customer.setStatus(true);
            customer.setFullName(fullname);
            customer.setAvatarImage(photo);
            customerRepository.save(customer);
            try {
                emailService.sendMail(email, fullname, rawPassword);
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
