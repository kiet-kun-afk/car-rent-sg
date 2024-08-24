package app.service.impl;

import org.springframework.stereotype.Service;

import app.dto.CardDTO;
import app.exception.DataNotFoundException;
import app.exception.InvalidParamException;
import app.model.Customer;
import app.model.cards.DriverLicense;
import app.repository.CustomerRepository;
import app.repository.DriverLicenseRepository;
import app.response.CardResponse;
import app.service.CustomerService;
import app.service.DriverLicenseService;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class DriverLicenseServiceImpl implements DriverLicenseService {

    private final DriverLicenseRepository driverLicenseRepository;
    private final FileService fileService;
    private final CustomerService customerService;
    private final CustomerRepository customerRepository;

    @Override
    public DriverLicense assignWithCustomer(CardDTO cardDTO) throws Exception {
        Customer customer = customerService.getAuth();
        DriverLicense driverLicense = driverLicenseRepository.findByCustomer(customer.getPhoneNumber());
        String idCard = cardDTO.getIdCard();
        if (driverLicense == null) {
            driverLicense = new DriverLicense();
            if (driverLicenseRepository.existsByIdCard(idCard)) {
                throw new InvalidParamException("Id card already exists");
            }
        }
        driverLicense.setIdCard(idCard);
        driverLicense.setFrontImage(fileService.upload(cardDTO.getFrontImage()));
        driverLicense.setBackImage(fileService.upload(cardDTO.getBackImage()));
        driverLicense.setIssueDate(cardDTO.getIssueDate());
        driverLicense.setExpiryDate(cardDTO.getExpiryDate());
        driverLicense.setCategory(cardDTO.getCategory());
        customer.setDriverLicense(driverLicenseRepository.save(driverLicense));
        customerRepository.save(customer);
        return driverLicense;
    }

    @Override
    public DriverLicense getDriverLicense(String idCard) throws Exception {
        DriverLicense driverLicense = driverLicenseRepository.findByIdCard(idCard);
        if (driverLicense == null) {
            throw new DataNotFoundException("Driver license not found");
        }
        return driverLicense;
    }

    @Override
    public CardResponse getYourDriverLicense() throws Exception {
        DriverLicense driverLicense = customerService.getAuth().getDriverLicense();
        if (driverLicense == null) {
            throw new DataNotFoundException("Driver license not found");
        }
        return CardResponse.fromDriverLicense(driverLicense);
    }
}
