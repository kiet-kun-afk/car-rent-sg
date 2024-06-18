package app.oauth2;

import java.util.Arrays;
import java.util.Collection;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.oauth2.core.user.OAuth2User;

import app.model.Customer;
import lombok.*;

// not use yet
@Data
@Builder
public class UserRoot implements UserDetails, OAuth2User {
    private Customer account;
    private List<GrantedAuthority> authorities;
    private Map<String, Object> attributes;

    public static UserRoot create(Customer acc) {
        return UserRoot.builder()
                .account(acc)
                .authorities(Arrays.stream(acc.getEmail().split(","))
                        .map(SimpleGrantedAuthority::new)
                        .collect(Collectors.toList()))
                .build();
    }

    public static UserRoot create(Customer user, Map<String, Object> attributes) {
        UserRoot userRoot = UserRoot.create(user);
        userRoot.setAttributes(attributes);
        return userRoot;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return this.authorities;
    }

    @Override
    public String getPassword() {
        return this.account.getPassword();
    }

    @Override
    public String getUsername() {
        return this.account.getUsername();
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }

    @Override
    public String getName() {
        return this.account.getUsername();
    }

}