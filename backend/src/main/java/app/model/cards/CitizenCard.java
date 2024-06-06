package app.model.cards;

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
@Table(name = "citizen_cards")
public class CitizenCard {

    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Id
    @Column(name = "citizen_id")
    private Integer citizenId;

    @Column(name = "id_card", nullable = true)
    private String idCard;

    @Column(name = "front_image", nullable = true)
    private String frontImage;

    @Column(name = "back_image", nullable = true)
    private String backImage;
}
