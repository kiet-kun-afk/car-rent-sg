package app.service.impl;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import app.dto.CitizencardDTO;
import app.exception.InvalidParamException;
import app.model.cards.*;
import app.repository.CitizencardRepository;
import app.response.CitizencardResponse;
import app.service.CitizencardService;

@Service
public class CitizencardServiceImpl implements CitizencardService {

    @Autowired
    CitizencardRepository citizencardRes;

    @Override
    public List<CitizencardResponse> getAll() {
        // TODO Auto-generated method stub
        return citizencardRes.findAll().stream().map(CitizencardResponse::fromCitizencard).toList();
    }

    @Override
    public CitizencardResponse getOne(Integer id) {
        // TODO Auto-generated method stub
        CitizenCard citizencard = citizencardRes.findById(id).orElse(null);
        return CitizencardResponse.fromCitizencard(citizencard);
    }

    @Override
    public CitizencardResponse Post(CitizencardDTO citizencardDTO) {
        // TODO Auto-generated method stub
        CitizenCard citizencard = new CitizenCard();

        citizencard.setIdCard(citizencardDTO.getIdCard());
        citizencard.setBackImage(citizencardDTO.getBackImage());
        citizencard.setFrontImage(citizencardDTO.getFrontImage());
        citizencardRes.save(citizencard);

        return CitizencardResponse.fromCitizencard(citizencard);

    }

    @Override
    public CitizencardResponse Put(Integer id, CitizencardDTO citizencardDTO) {
        Optional<CitizenCard> optionalcitizencard = citizencardRes.findById(id);

        if (optionalcitizencard.isPresent()) {
            CitizenCard citizencard = new CitizenCard();

            citizencard.setIdCard(citizencardDTO.getIdCard());
            citizencard.setBackImage(citizencardDTO.getBackImage());
            citizencard.setFrontImage(citizencardDTO.getFrontImage());
            citizencardRes.save(citizencard);
            return CitizencardResponse.fromCitizencard(citizencard);
        } else {
            throw new RuntimeException("Citizencard not found with id " + id);
        }
    }

    @Override
    public void Delete(Integer id) throws Exception {
        if (!citizencardRes.existsById(id)) {
            throw new InvalidParamException("Citizencard not found");
        }
        citizencardRes.deleteById(id);
    }

}
