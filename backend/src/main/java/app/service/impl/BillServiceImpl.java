package app.service.impl;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import app.dto.BillDTO;
import app.exception.InvalidParamException;
import app.model.Bill;
import app.model.Contract;
import app.repository.BillRepository;
import app.response.BillResponse;
import app.service.BillService;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
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

    @Override
    public Bill createDepositBill(Contract contract) throws Exception {
        if (contract == null) {
            throw new InvalidParamException("Maybe contract is not found or is not confirmed");
        }
        Bill bill = new Bill();
        bill.setContract(contract);
        bill.setPayDate(LocalDateTime.now());
        bill.setPayCost(contract.getTotalRentCost() * 0.2);
        bill.setPaymentMethod(contract.getWayToPay());
        bill.setDescribe("Thanh toán tiền cọc cho dịch vụ thuê xe " + contract.getCar().getCarName());
        bill.setStaff(contract.getStaff());
        bill.setPaymentStatus(false);
        billRepository.save(bill);
        contract.setDeposit(bill.getPayCost());
        return bill;
    }

    @Override
    public BillResponse completeDepositBill(Integer id) throws Exception {
        throw new UnsupportedOperationException("Unimplemented method 'completeDepositBill'");
    }

}
