package app.service.impl;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import app.dto.BillDTO;
import app.exception.DataNotFoundException;
import app.exception.InvalidParamException;
import app.model.Bill;
import app.model.Contract;
import app.repository.BillRepository;
import app.repository.ContractRepository;
import app.response.BillResponse;
import app.service.BillService;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class BillServiceImpl implements BillService {

    @Autowired
    BillRepository billRepository;

    private final ContractRepository contractRepository;

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
        bill.setPayCost(contract.getTotalRentCost() * 20 / 100);
        bill.setPayDate(LocalDateTime.now());
        bill.setIncurredCost("Thanh toán tiền cọc cho dịch vụ thuê xe ");
        bill.setPaymentMethod(contract.getWayToPay());
        bill.setDescribe("Thanh toán tiền cọc cho dịch vụ thuê xe " + contract.getCar().getCarName());
        bill.setStaff(contract.getStaff());
        bill.setPaymentStatus(false);
        bill.setRemainCost(0);
        billRepository.save(bill);
        contract.setDeposit(bill.getPayCost());
        return bill;
    }

    @Override
    public BillResponse completeDepositBill(Integer id, long deposit) throws Exception {
        Bill bill = billRepository.findByBillIdAndPaymentStatusFalse(id);
        if (bill == null) {
            throw new DataNotFoundException("Bill not found or already completed");
        }
        Contract contract = bill.getContract();
        contract.setDeposit(deposit);
        bill.setPaymentStatus(true);
        bill.setPayDate(LocalDateTime.now());
        try {
            billRepository.save(bill);
            contractRepository.save(contract);
            return BillResponse.fromBill(bill);
        } catch (Exception e) {
            throw new InvalidParamException("Cannot save!");
        }
    }

}
