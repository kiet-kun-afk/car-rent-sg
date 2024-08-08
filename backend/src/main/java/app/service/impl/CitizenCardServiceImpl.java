package app.service.impl;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import app.dto.CitizenCardDTO;
import app.exception.InvalidParamException;
import app.model.cards.*;
import app.repository.*;
import app.response.CitizenCardResponse;
import app.service.CitizenCardService;

@Service
public class CitizenCardServiceImpl implements CitizenCardService {

    @Autowired
    CitizenCardRepository citizenCardRes;

    @Override
    public List<CitizenCardResponse> getAll() {

        return citizenCardRes.findAll().stream().map(CitizenCardResponse::fromCitizenCard).toList();
    }

    @Override
    public CitizenCardResponse getOne(Integer id) {
        CitizenCard citizenCard = citizenCardRes.findById(id).orElse(null);
        return CitizenCardResponse.fromCitizenCard(citizenCard);
    }

    @Override
    public CitizenCardResponse Post(CitizenCardDTO citizenCardDTO) {
        CitizenCard citizenCard = new CitizenCard();

        citizenCard.setIdCard(citizenCardDTO.getIdCard());

        // how to upload image with String type
        citizenCard.setBackImage(citizenCardDTO.getBackImage());
        citizenCard.setFrontImage(citizenCardDTO.getFrontImage());
        citizenCardRes.save(citizenCard);

        return CitizenCardResponse.fromCitizenCard(citizenCard);

    }

    @Override
    public CitizenCardResponse Put(Integer id, CitizenCardDTO citizenCardDTO) {
        Optional<CitizenCard> optionalCitizenCard = citizenCardRes.findById(id);

        if (optionalCitizenCard.isPresent()) {
            CitizenCard citizenCard = new CitizenCard();

            citizenCard.setIdCard(citizenCardDTO.getIdCard());

            // need fix to upload image
            citizenCard.setBackImage(citizenCardDTO.getBackImage());
            citizenCard.setFrontImage(citizenCardDTO.getFrontImage());
            citizenCardRes.save(citizenCard);
            return CitizenCardResponse.fromCitizenCard(citizenCard);
        } else {
            throw new RuntimeException("Citizen card not found with id " + id);
        }
    }

    @Override
    public void Delete(Integer id) throws Exception {
        if (!citizenCardRes.existsById(id)) {
            throw new InvalidParamException("Citizen card not found");
        }
        citizenCardRes.deleteById(id);
    }

}
