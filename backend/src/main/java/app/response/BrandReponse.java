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
public class BrandReponse {

    private Integer brandId;

    private String brandName;

    private String brandImage;

    private String countryOrigin;

    public BrandReponse(Brand brand) {
        this.brandId = brand.getBrandId();
        this.brandImage = brand.getBrandImage();
        this.brandName = brand.getBrandName();
        this.countryOrigin = brand.getCountryOrigin();

    }

    public static BrandReponse fromBrandResponse(Brand brand) {
        return new BrandReponse(brand);
    }

}
