package app.service;

import app.dto.CardDTO;
import app.model.cards.DriverLicense;

public interface DriverLicenseService {

    public DriverLicense assignWithCustomer(String phoneNumber, CardDTO cardDTO) throws Exception;

}
