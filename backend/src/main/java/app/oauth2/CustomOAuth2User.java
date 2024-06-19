package app.oauth2;

import java.util.Collection;
import java.util.Map;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.oauth2.core.user.OAuth2User;

import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
public class CustomOAuth2User implements OAuth2User {

    private OAuth2User oauth2User;
    private String clientName;
    private String email;

    @Override
    public Map<String, Object> getAttributes() {
        return oauth2User.getAttributes();
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return oauth2User.getAuthorities();
    }

    @Override
    public String getName() {
        return oauth2User.getName();
    }

    public String getEmail() {
        return email != null ? email : oauth2User.getAttribute("email");
    }

    public String getPhoto() {
        return oauth2User.getAttribute("picture") == null ? (String) oauth2User.getAttribute("avatar_url")
                : oauth2User.getAttribute("picture");
    }

    public String getClientName() {
        return clientName;
    }

    public String getFullname() {
        return oauth2User.getAttribute("name");
    }
}
