package com.example.backend.model.dto;

import com.example.backend.model.entity.ContentType;
import com.example.backend.model.entity.OnlineExhibition;
import lombok.*;
import org.springframework.web.multipart.MultipartFile;

import javax.persistence.*;

@Data
@ToString
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ContentDto {
    private int orderId;

    private MultipartFile link;

    private String description;

    private ContentType contentType;

    //private OnlineExhibition onlineExhibition;
}
