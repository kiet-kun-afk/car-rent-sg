package app.model.records;

import lombok.*;

import java.time.LocalDateTime;

import app.model.Staff;
import jakarta.persistence.*;

@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
@MappedSuperclass
public abstract class BaseRecord {

    @Column(name = "date", nullable = false)
    private LocalDateTime date;

    @Column(name = "kilometer_number", nullable = false)
    private Integer kilometerNumber;

    @Column(name = "fuel_number", nullable = false)
    private Integer fuelNumber;

    @Column(name = "notes")
    private String notes;

    @Column(name = "status", nullable = false)
    private Boolean status;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "staff_id")
    private Staff staff;
}
