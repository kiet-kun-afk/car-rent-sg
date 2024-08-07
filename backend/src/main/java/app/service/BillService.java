package app.service;

import java.util.List;

import app.dto.BillDTO;
import app.model.Bill;
import app.model.Contract;
import app.response.BillResponse;

public interface BillService {
    public List<BillResponse> getAll();

    public BillResponse getOne(Integer id);

    public BillResponse Post(BillDTO billDTO);

    public Bill createDepositBill(Contract contract) throws Exception;

    public BillResponse completeDepositBill(Integer id, long deposit) throws Exception;

}
