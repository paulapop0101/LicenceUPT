package dd.projects.ddshop.dtos;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class AddressDTO {

    private String streetLine;

    private String postalCode;

    private String city;

    private String county;

    private String country;
}
