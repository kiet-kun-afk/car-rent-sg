package app.response;

import app.model.cards.CitizenCard;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class CitizenCardResponse {
    private Integer citizenId;

    private String idCard;
    private String frontImage;
    private String backImage;

    public CitizenCardResponse(CitizenCard citizenCard) {
        this.citizenId = citizenCard.getCitizenId();
        this.idCard = citizenCard.getIdCard();
        this.frontImage = citizenCard.getFrontImage();
        this.backImage = citizenCard.getBackImage();
    }

    public static CitizenCardResponse fromCitizenCard(CitizenCard citizenCard) {
        return new CitizenCardResponse(citizenCard);
    }
}
