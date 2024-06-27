package app.service;

import app.dto.CardDTO;
import app.model.cards.DriverLicense;

public interface DriverLicenseService {

    public DriverLicense assignWithCustomer(CardDTO cardDTO) throws Exception;

    public DriverLicense getDriverLicense(String idCard) throws Exception;
}
