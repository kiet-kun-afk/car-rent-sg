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
public class CategoryReponse {

    private Integer categoryId;

    private String categoryName;

    public CategoryReponse(Category category) {
        this.categoryId = category.getCategoryId();
        this.categoryName = category.getCategoryName();
    }

    public static CategoryReponse fromCategoryResponse(Category category) {
        return new CategoryReponse(category);
    }
}
