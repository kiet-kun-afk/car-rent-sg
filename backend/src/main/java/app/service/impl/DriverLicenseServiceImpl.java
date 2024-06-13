package app.service.impl;

import org.springframework.stereotype.Service;

import app.dto.CardDTO;
import app.exception.InvalidParamException;
import app.model.Customer;
import app.model.cards.DriverLicense;
import app.repository.CustomerRepository;
import app.repository.DriverLicenseRepository;
import app.service.CustomerService;
import app.service.DriverLicenseService;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class DriverLicenseServiceImpl implements DriverLicenseService {

    private final DriverLicenseRepository driverLicenseRepository;
    private final FileService fileService;
    private final CustomerRepository customerRepository;
    private final CustomerService customerService;

    @Override
    public DriverLicense assignWithCustomer(String phoneNumber, CardDTO cardDTO) throws Exception {
        Customer customerPhone = customerRepository.findByPhoneNumber(phoneNumber);
        DriverLicense driverLicense = driverLicenseRepository.findByCustomer(phoneNumber);
        if (driverLicense == null) {
            driverLicense = new DriverLicense();
        }

        Customer customerAuth = customerService.getAuth();
        if (customerAuth != customerPhone) {
            throw new InvalidParamException("This phone number does not belong to you");
        }

        driverLicense.setIdCard(cardDTO.getIdCard());
        driverLicense.setBackImage(fileService.upload(cardDTO.getBackImage()));
        driverLicense.setFrontImage(fileService.upload(cardDTO.getFrontImage()));
        customerAuth.setDriverLicense(driverLicenseRepository.save(driverLicense));
        return driverLicense;
    }

}
