package app.service;

import java.util.List;

import app.dto.CitizencardDTO;
import app.response.CitizenCardResponse;

public interface CitizenCardService {
    public List<CitizenCardResponse> getAll();

    public CitizenCardResponse getOne(Integer id);

    public CitizenCardResponse Post(CitizencardDTO citizencardDTO);

    public CitizenCardResponse Put(Integer id, CitizencardDTO citizencardDTO);

    public void Delete(Integer id) throws Exception;
}
