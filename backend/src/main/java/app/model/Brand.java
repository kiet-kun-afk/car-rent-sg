package app.model;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "brands")
public class Brand {

    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Id
    @Column(name = "brand_id")
    private Integer brandId;

    @Column(name = "brand_name", nullable = false)
    private String brandName;

    @Column(name = "brand_image")
    private String brandImage;

    @Column(name = "country_origin", nullable = false)
    private String countryOrigin;

    @JsonIgnore
    @OneToMany(mappedBy = "brand")
    private List<Car> cars;
}
