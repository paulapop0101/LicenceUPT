package dd.projects.ddshop.dtos;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class UserDTO {

    private int id;
    private String firstname;

    private String lastname;

    private String phone;

    private String email;

}
