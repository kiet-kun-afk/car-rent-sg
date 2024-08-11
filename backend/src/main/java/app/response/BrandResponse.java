package app.response;

import app.model.Brand;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class BrandResponse {

    private Integer brandId;

    private String brandName;

    private String brandImage;

    private String countryOrigin;

    public BrandResponse(Brand brand) {
        this.brandId = brand.getBrandId();
        this.brandImage = brand.getBrandImage();
        this.brandName = brand.getBrandName();
        this.countryOrigin = brand.getCountryOrigin();

    }

    public static BrandResponse fromBrandResponse(Brand brand) {
        return new BrandResponse(brand);
    }

}
