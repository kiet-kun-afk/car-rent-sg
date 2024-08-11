package app.service;

import java.util.List;

import app.dto.BrandDTO;

import app.response.BrandResponse;

public interface BrandService {

    public List<BrandResponse> getALL();

    public BrandResponse getOne(Integer id);

    public BrandResponse Post(BrandDTO brandDTO);

    public BrandResponse Put(Integer id, BrandDTO brandDTO);

    public void Delete(Integer id) throws Exception;

}
