package com.example.backend.model.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.ToString;
import org.springframework.web.multipart.MultipartFile;

@Data
@ToString
@AllArgsConstructor
@Builder
public class Step2Dto {
    private Integer id;

    private String link;

    private String description;
}
