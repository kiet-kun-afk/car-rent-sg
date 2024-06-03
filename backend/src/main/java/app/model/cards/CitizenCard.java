package app.model.cards;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.persistence.UniqueConstraint;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "citizen_cards", uniqueConstraints = {
        @UniqueConstraint(columnNames = { "id_card" }) })
public class CitizenCard {

    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Id
    @Column(name = "citizen_id")
    private Integer citizenId;

    @Column(name = "id_card", nullable = true)
    private Integer idCard;

    @Column(name = "front_image", nullable = true)
    private String frontImage;

    @Column(name = "back_image", nullable = true)
    private String backImage;
}
