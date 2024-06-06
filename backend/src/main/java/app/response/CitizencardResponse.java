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
public class CitizencardResponse {
    private Integer citizenId;

    private String idCard;
    private String frontImage;
    private String backImage;

    public CitizencardResponse(CitizenCard citizencard) {
        this.citizenId = citizencard.getCitizenId();
        this.idCard = citizencard.getIdCard();
        this.frontImage = citizencard.getFrontImage();
        this.backImage = citizencard.getBackImage();
    }

    public static CitizencardResponse fromCitizencard(CitizenCard citizencard) {
        return new CitizencardResponse(citizencard);
    }
}
