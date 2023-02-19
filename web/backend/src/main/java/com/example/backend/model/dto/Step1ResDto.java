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
public class Step1ResDto {
    private int step;
    private String title;
    private String tag1;
    private String tag2;
    private String tag3;
    private String poster;
    private String description;
}
