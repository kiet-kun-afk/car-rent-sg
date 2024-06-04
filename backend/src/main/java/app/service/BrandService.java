package app.service;

import java.util.List;

import app.dto.BrandDTO;

import app.response.BrandReponse;

public interface BrandService {

    public List<BrandReponse> getALL();

    public BrandReponse getOne(Integer id);

    public BrandReponse Post(BrandDTO brandDTO);

    public BrandReponse Put(Integer id, BrandDTO brandDTO);

    public void Delete(Integer id) throws Exception;

}
