package app.model;

import java.time.LocalDate;
// import java.util.List;
// import java.sql.Date;
// import java.time.LocalDateTime;
import java.util.Set;

import app.model.cards.CitizenCard;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Builder
@Table(name = "staffs", uniqueConstraints = {
        @UniqueConstraint(columnNames = { "phone_number" }),
        @UniqueConstraint(columnNames = { "email" }) })
public class Staff {

    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Id
    @Column(name = "staff_id")
    private Integer staffId;

    @Column(name = "first_name")
    private String firstName;

    @Column(name = "last_name")
    private String lastName;

    private Boolean gender;

    @Column(name = "phone_number", nullable = false, unique = true)
    private String phoneNumber;

    @Column(name = "birth_date")
    private LocalDate birthDate;

    @Column(nullable = false, unique = true)
    private String email;

    @ManyToMany(fetch = FetchType.EAGER, cascade = CascadeType.ALL)
    @JoinTable(name = "staff_roles", joinColumns = @JoinColumn(name = "staff_id", referencedColumnName = "staff_id"), inverseJoinColumns = @JoinColumn(name = "role_id", referencedColumnName = "id"))
    private Set<Role> roles;

    private Boolean status;

    @Column(name = "avatar_image")
    private String avatarImage;

    @Column(nullable = false)
    private String password;

    @ManyToOne
    @JoinColumn(name = "address_id")
    private Address address;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "citizen_id")
    private CitizenCard citizenCard;
}
