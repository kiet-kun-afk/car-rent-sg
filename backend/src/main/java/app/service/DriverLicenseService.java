package app.service;

import app.dto.CardDTO;
import app.model.cards.DriverLicense;
import app.response.CardResponse;

public interface DriverLicenseService {

    public DriverLicense assignWithCustomer(CardDTO cardDTO) throws Exception;

    public DriverLicense getDriverLicense(String idCard) throws Exception;

    public CardResponse getYourDriverLicense() throws Exception;
}
