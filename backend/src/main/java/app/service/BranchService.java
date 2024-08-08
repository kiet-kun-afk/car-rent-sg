package app.service;

import java.util.List;

import app.dto.BranchDTO;
import app.response.BranchResponse;

public interface BranchService {

    public List<BranchResponse> getAll();

    public BranchResponse getOne(Integer id);

    public BranchResponse post(BranchDTO branchDTO);

    public BranchResponse put(Integer id, BranchDTO branchDTO);

    public void delete(Integer id) throws Exception;

}
