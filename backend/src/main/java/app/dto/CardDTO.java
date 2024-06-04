package app.dto;

import org.springframework.web.multipart.MultipartFile;

import lombok.*;

@Setter
@Getter
public class CardDTO {

    private Integer idCard;

    private MultipartFile frontImage;

    private MultipartFile backImage;
}
