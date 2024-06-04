package app.response;

import app.model.cards.CitizenCard;
import app.model.cards.DriverLicense;
import lombok.*;

@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class CardResponse {

    private Integer idCard;

    private String frontImage;

    private String backImage;

    public CardResponse(CitizenCard citizenCard) {
        this.idCard = citizenCard.getIdCard();
        this.frontImage = citizenCard.getFrontImage();
        this.backImage = citizenCard.getBackImage();
    }

    public CardResponse(DriverLicense driverLicense) {
        this.idCard = driverLicense.getIdCard();
        this.frontImage = driverLicense.getFrontImage();
        this.backImage = driverLicense.getBackImage();
    }

    public static CardResponse fromCitizenCard(CitizenCard citizenCard) {
        return new CardResponse(citizenCard);
    }

    public static CardResponse fromDriverLicense(DriverLicense driverLicense) {
        return new CardResponse(driverLicense);
    }
}
