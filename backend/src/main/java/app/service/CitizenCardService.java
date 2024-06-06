package app.service;

import app.dto.CardDTO;
import app.model.cards.CitizenCard;

public interface CitizenCardService {
    public CitizenCard createWithStaffId(Integer staffId, CardDTO cardDTO) throws Exception;

    public CitizenCard createWithCustomerId(Integer customerId, CardDTO cardDTO) throws Exception;
}
