package app.response;

import app.model.Category;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class CategoryResponse {

    private Integer categoryId;

    private String categoryName;

    private String categoryImage;

    public CategoryResponse(Category category) {
        this.categoryId = category.getCategoryId();
        this.categoryName = category.getCategoryName();
        this.categoryImage = category.getCategoryImage();
    }

    public static CategoryResponse fromCategoryResponse(Category category) {
        return new CategoryResponse(category);
    }
}
