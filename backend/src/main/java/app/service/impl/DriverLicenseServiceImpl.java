package app.service.impl;

import org.springframework.stereotype.Service;

import app.dto.CardDTO;
import app.model.cards.DriverLicense;
import app.repository.DriverLicenseRepository;
import app.service.DriverLicenseService;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class DriverLicenseServiceImpl implements DriverLicenseService {

    private final DriverLicenseRepository driverLicenseRepository;
    private final FileService fileService;

    @Override
    public DriverLicense createWithCustomerId(Integer customerId, CardDTO cardDTO) throws Exception {
        DriverLicense driverLicense = driverLicenseRepository.findByCustomerId(customerId);
        if (driverLicense == null) {
            driverLicense = new DriverLicense();
        }
        driverLicense.setIdCard(cardDTO.getIdCard());
        driverLicense.setBackImage(fileService.saveImage(cardDTO.getBackImage()));
        driverLicense.setFrontImage(fileService.saveImage(cardDTO.getFrontImage()));
        return driverLicenseRepository.save(driverLicense);
    }

}
