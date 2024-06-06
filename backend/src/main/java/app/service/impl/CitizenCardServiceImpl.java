package app.service.impl;

import org.springframework.stereotype.Service;

import app.dto.CardDTO;
import app.model.cards.CitizenCard;
import app.repository.CitizenCardRepository;
import app.service.CitizenCardService;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class CitizenCardServiceImpl implements CitizenCardService {

    private final CitizenCardRepository citizenCardRepository;
    private final FileService fileService;

    @Override
    public CitizenCard createWithStaffId(Integer staffId, CardDTO cardDTO) throws Exception {
        CitizenCard citizenCard = citizenCardRepository.findByStaffId(staffId);
        if (citizenCard == null) {
            citizenCard = new CitizenCard();
        }
        citizenCard.setIdCard(cardDTO.getIdCard());
        citizenCard.setBackImage(fileService.saveImage(cardDTO.getBackImage()));
        citizenCard.setFrontImage(fileService.saveImage(cardDTO.getFrontImage()));
        return citizenCardRepository.save(citizenCard);
    }

    @Override
    public CitizenCard createWithCustomerId(Integer customerId, CardDTO cardDTO) throws Exception {
        CitizenCard citizenCard = citizenCardRepository.findByCustomerId(customerId);
        if (citizenCard == null) {
            citizenCard = new CitizenCard();
        }
        citizenCard.setIdCard(cardDTO.getIdCard());
        citizenCard.setBackImage(fileService.saveImage(cardDTO.getBackImage()));
        citizenCard.setFrontImage(fileService.saveImage(cardDTO.getFrontImage()));
        return citizenCardRepository.save(citizenCard);
    }

}
