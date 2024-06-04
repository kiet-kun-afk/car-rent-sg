package app.service;

import java.util.List;

import app.dto.CitizencardDTO;
import app.response.CitizencardResponse;

public interface CitizencardService {
    public List<CitizencardResponse> getAll();

    public CitizencardResponse getOne(Integer id);

    public CitizencardResponse Post(CitizencardDTO citizencardDTO);

    public CitizencardResponse Put(Integer id, CitizencardDTO citizencardDTO);

    public void Delete(Integer id) throws Exception;
}
