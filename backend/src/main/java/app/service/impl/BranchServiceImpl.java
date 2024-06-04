package app.service.impl;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import app.dto.BranchDTO;
import app.exception.InvalidParamException;

import app.model.Branch;
import app.repository.AddressRepository;
import app.repository.BranchesRepository;
import app.response.BranchResponse;
import app.service.BranchService;

@Service
public class BranchServiceImpl implements BranchService {

    @Autowired
    BranchesRepository branchRes;

    @Autowired
    AddressRepository addressRes;

    @Override
    public List<BranchResponse> getAll() {
        // TODO Auto-generated method stub
        return branchRes.findAll().stream().map(BranchResponse::fromBranchResponse).toList();
    }

    @Override
    public BranchResponse getOne(Integer id) {
        // TODO Auto-generated method stub
        Branch branch = branchRes.findById(id).orElse(null);
        return BranchResponse.fromBranchResponse(branch);

    }

    @Override
    public BranchResponse post(BranchDTO branchDTO) {

        // addressRes.findById(branchDTO.getAddressid()).orElse(null);
        // System.out.println("addressid: " + addressid);

        Branch branch = new Branch();
        branch.setAddress(addressRes.findById(branchDTO.getAddressid()).orElse(null));
        branch.setEmail(branchDTO.getEmail());
        branch.setBranchName(branchDTO.getBranchName());
        branch.setPhoneNumber(branchDTO.getPhoneNumber());
        branchRes.save(branch);
        return BranchResponse.fromBranchResponse(branch);

    }

    @Override
    public BranchResponse put(Integer id, BranchDTO branchDTO) {
        // TODO Auto-generated method stub

        Optional<Branch> optinalBranch = branchRes.findById(id);

        if (optinalBranch.isPresent()) {
            Branch branch = optinalBranch.get();

            branch.setEmail(branchDTO.getEmail());
            branch.setBranchName(branchDTO.getBranchName());
            branch.setPhoneNumber(branchDTO.getPhoneNumber());
            branchRes.save(branch);
            return BranchResponse.fromBranchResponse(branch);
        } else {
            throw new RuntimeException("Car not found with id " + id);
        }
    }

    @Override
    public void delete(Integer id) throws Exception {
        if (!branchRes.existsById(id)) {
            throw new InvalidParamException("Branch not found");

        }
        branchRes.deleteById(id);

    }
}
