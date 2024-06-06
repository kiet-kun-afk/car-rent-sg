package app.service;

import java.util.List;

import app.dto.CitizenCardDTO;
import app.response.CitizenCardResponse;

public interface CitizenCardService {
    public List<CitizenCardResponse> getAll();

    public CitizenCardResponse getOne(Integer id);

    public CitizenCardResponse Post(CitizenCardDTO citizenCardDTO);

    public CitizenCardResponse Put(Integer id, CitizenCardDTO citizenCardDTO);

    public void Delete(Integer id) throws Exception;
}
