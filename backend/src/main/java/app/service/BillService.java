package app.service;

import java.util.List;

import app.dto.BillDTO;
import app.response.BillResponse;

public interface BillService {
    public List<BillResponse> getAll();

    public BillResponse getOne(Integer id);

    public BillResponse Post(BillDTO billDTO);

}
