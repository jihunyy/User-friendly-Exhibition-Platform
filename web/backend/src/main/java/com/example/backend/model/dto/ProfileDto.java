package com.example.backend.model.dto;

import lombok.Data;
import lombok.ToString;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;

@Data
@ToString
public class ProfileDto {
    private MultipartFile profile;
}
