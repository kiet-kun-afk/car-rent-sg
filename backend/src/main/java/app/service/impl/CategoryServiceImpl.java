package app.service.impl;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import app.dto.CategoryDTO;
import app.exception.InvalidParamException;
import app.model.Category;
import app.repository.CategoryRepository;

import app.response.CategoryReponse;
import app.service.CategoryService;

@Service
public class CategoryServiceImpl implements CategoryService {

    @Autowired
    CategoryRepository categoryRes;

    @Override
    public List<CategoryReponse> getAll() {
        // TODO Auto-generated method stub
        return categoryRes.findAll().stream().map(CategoryReponse::fromCategoryResponse).toList();
    }

    @Override
    public CategoryReponse getOne(Integer id) {
        // TODO Auto-generated method stub
        Category category = categoryRes.findById(id).orElse(null);
        return CategoryReponse.fromCategoryResponse(category);
    }

    @Override
    public CategoryReponse Post(CategoryDTO categoryDTO) {

        Category category = new Category();

        category.setCategoryName(categoryDTO.getCategoryName());
        categoryRes.save(category);

        return CategoryReponse.fromCategoryResponse(category);
    }

    @Override
    public CategoryReponse Put(Integer id, CategoryDTO categoryDTO) {
        Optional<Category> optionalcategory = categoryRes.findById(id);

        if (optionalcategory.isPresent()) {
            Category category = optionalcategory.get();
            category.setCategoryName(categoryDTO.getCategoryName());
            categoryRes.save(category);
            return CategoryReponse.fromCategoryResponse(category);
        } else {
            throw new RuntimeException("Car not found with id " + id);
        }
    }

    @Override
    public void Delete(Integer id) throws Exception {
        if (!categoryRes.existsById(id)) {
            throw new InvalidParamException("Category not found");
        }
        categoryRes.deleteById(id);
    }

}
