package app.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import app.dto.BillDTO;
import app.model.Bill;
import app.repository.BillRepository;
import app.response.BillResponse;
import app.service.BillService;

@Service
public class BillServiceImpl implements BillService {

    @Autowired
    BillRepository billRepository;

    @Override
    public List<BillResponse> getAll() {
        return billRepository.findAll().stream().map(BillResponse::fromBill).toList();
    }

    @Override
    public BillResponse getOne(Integer id) {
        Bill bill = billRepository.findById(id).orElse(null);
        return BillResponse.fromBill(bill);
    }

    @Override
    public BillResponse Post(BillDTO billDTO) {
        throw new UnsupportedOperationException("Unimplemented method 'Post'");
    }

}
