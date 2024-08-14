package app.model;

import jakarta.persistence.*;
import lombok.*;

@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "address")
public class Address {

    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Id
    @Column(name = "address_id")
    private Integer addressId;

    private String province;

    private String district;

    private String ward;

    private String street;

    private String rememberName;

    public Address(String province, String district, String ward, String street, String rememberName) {
        this.province = province;
        this.district = district;
        this.ward = ward;
        this.street = street;
        this.rememberName = rememberName;
    }

    public Address(String province, String district, String ward, String street) {
        this.province = province;
        this.district = district;
        this.ward = ward;
        this.street = street;
    }

    @OneToOne(mappedBy = "address")
    private Customer customer;
}
