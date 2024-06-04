package app.service;

import app.dto.CardDTO;
import app.model.cards.DriverLicense;

public interface DriverLicenseService {
    public DriverLicense createWithCustomerId(Integer customerId, CardDTO cardDTO) throws Exception;
}
