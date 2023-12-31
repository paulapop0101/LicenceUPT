package dd.projects.ddshop.dtos;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.List;

@Data
@AllArgsConstructor
public class AttributeDTO {
    private int id;
    private String name;

    private Boolean isOnPDP;
    private List<AttributeValueDTO> values;
    private List<SubcategoryDTO> subcategories;
}
