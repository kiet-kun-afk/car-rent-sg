package app.service.impl;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import app.dto.CitizencardDTO;
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
        // TODO Auto-generated method stub
        CitizenCard citizenCard = citizenCardRes.findById(id).orElse(null);
        return CitizenCardResponse.fromCitizenCard(citizenCard);
    }

    @Override
    public CitizenCardResponse Post(CitizencardDTO citizencardDTO) {
        // TODO Auto-generated method stub
        CitizenCard citizencard = new CitizenCard();

        citizencard.setIdCard(citizencardDTO.getIdCard());
        citizencard.setBackImage(citizencardDTO.getBackImage());
        citizencard.setFrontImage(citizencardDTO.getFrontImage());
        citizenCardRes.save(citizencard);

        return CitizenCardResponse.fromCitizenCard(citizencard);

    }

    @Override
    public CitizenCardResponse Put(Integer id, CitizencardDTO citizencardDTO) {
        Optional<CitizenCard> optionalcitizencard = citizenCardRes.findById(id);

        if (optionalcitizencard.isPresent()) {
            CitizenCard citizencard = new CitizenCard();

            citizencard.setIdCard(citizencardDTO.getIdCard());
            citizencard.setBackImage(citizencardDTO.getBackImage());
            citizencard.setFrontImage(citizencardDTO.getFrontImage());
            citizenCardRes.save(citizencard);
            return CitizenCardResponse.fromCitizenCard(citizencard);
        } else {
            throw new RuntimeException("Citizencard not found with id " + id);
        }
    }

    @Override
    public void Delete(Integer id) throws Exception {
        if (!citizenCardRes.existsById(id)) {
            throw new InvalidParamException("Citizencard not found");
        }
        citizenCardRes.deleteById(id);
    }

}
