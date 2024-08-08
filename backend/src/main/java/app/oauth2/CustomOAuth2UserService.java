package app.oauth2;

import java.util.List;
import java.util.Map;

import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

@Service
public class CustomOAuth2UserService extends DefaultOAuth2UserService {

    private static final String GITHUB_EMAILS_URL = "https://api.github.com/user/emails";

    @Override
    public OAuth2User loadUser(OAuth2UserRequest userRequest) throws OAuth2AuthenticationException {
        OAuth2User oauth2User = super.loadUser(userRequest);
        String clientName = userRequest.getClientRegistration().getClientName();
        if ("GitHub".equals(clientName)) {
            RestTemplate restTemplate = new RestTemplate();
            String accessToken = userRequest.getAccessToken().getTokenValue();
            // Cấu hình yêu cầu HTTP để thêm Authorization header với Bearer token
            HttpHeaders headers = new HttpHeaders();
            headers.set("Authorization", "Bearer " + accessToken);
            HttpEntity<String> entity = new HttpEntity<>(headers);

            ResponseEntity<List<Map<String, Object>>> response = restTemplate.exchange(
                    GITHUB_EMAILS_URL, HttpMethod.GET, entity,
                    new ParameterizedTypeReference<List<Map<String, Object>>>() {
                    });

            List<Map<String, Object>> emails = response.getBody();

            String primaryEmail = emails.stream()
                    .filter(email -> (Boolean) email.get("primary") && (Boolean) email.get("verified"))
                    .map(email -> (String) email.get("email"))
                    .findFirst()
                    .orElse(null);

            return new CustomOAuth2User(oauth2User, clientName, primaryEmail);
        }

        return new CustomOAuth2User(oauth2User, clientName, oauth2User.getAttribute("email"));
    }
}
