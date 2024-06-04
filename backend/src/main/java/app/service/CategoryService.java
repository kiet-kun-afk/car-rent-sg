package app.service;

import java.util.List;

import app.dto.CategoryDTO;

import app.response.CategoryReponse;

public interface CategoryService {

    public List<CategoryReponse> getAll();

    public CategoryReponse getOne(Integer id);

    public CategoryReponse Post(CategoryDTO categoryDTO);

    public CategoryReponse Put(Integer id, CategoryDTO categoryDTO);

    public void Delete(Integer id) throws Exception;

}
