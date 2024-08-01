package app.response;

import java.time.LocalDate;

import app.model.cards.CitizenCard;
import app.model.cards.DriverLicense;
import lombok.*;

@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class CardResponse {

    private String idCard;

    private String frontImage;

    private String backImage;

    private LocalDate issueDate;

    private LocalDate expiryDate;

    private String category;

    public CardResponse(CitizenCard citizenCard) {
        this.idCard = citizenCard.getIdCard();
        this.frontImage = citizenCard.getFrontImage();
        this.backImage = citizenCard.getBackImage();
        this.issueDate = citizenCard.getIssueDate();
        this.expiryDate = citizenCard.getExpiryDate();
    }

    public CardResponse(DriverLicense driverLicense) {
        this.idCard = driverLicense.getIdCard();
        this.frontImage = driverLicense.getFrontImage();
        this.backImage = driverLicense.getBackImage();
        this.issueDate = driverLicense.getIssueDate();
        this.expiryDate = driverLicense.getExpiryDate();
        this.category = driverLicense.getCategory();
    }

    public static CardResponse fromCitizenCard(CitizenCard citizenCard) {
        return new CardResponse(citizenCard);
    }

    public static CardResponse fromDriverLicense(DriverLicense driverLicense) {
        return new CardResponse(driverLicense);
    }
}
