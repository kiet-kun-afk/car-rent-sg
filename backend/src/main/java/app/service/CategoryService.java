package app.service;

import java.util.List;

import app.dto.CategoryDTO;
import app.response.CategoryResponse;

public interface CategoryService {

    public List<CategoryResponse> getAll();

    public CategoryResponse getOne(Integer id);

    public CategoryResponse Post(CategoryDTO categoryDTO);

    public CategoryResponse Put(Integer id, CategoryDTO categoryDTO);

    public void Delete(Integer id) throws Exception;

}
