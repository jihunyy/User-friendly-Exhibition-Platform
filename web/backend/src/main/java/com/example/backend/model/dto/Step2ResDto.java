package com.example.backend.model.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.ToString;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@Data
@ToString
@AllArgsConstructor
@Builder
public class Step2ResDto {
    private List<Integer> IDList;
    private List<String> fileList;
    private List<String> descriptionList;
    private List<Step2Dto> contentDtoList;
}
