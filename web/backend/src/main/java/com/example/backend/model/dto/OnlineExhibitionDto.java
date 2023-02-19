package com.example.backend.model.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.*;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDateTime;

@Data
@ToString
@AllArgsConstructor
@Builder
@NoArgsConstructor
public class OnlineExhibitionDto {
    private Long id;

    private String title;

    private String description;


    @JsonFormat(shape=JsonFormat.Shape.STRING,pattern="yy년 MM월 dd일 HH:mm",timezone = "Asia/Seoul")
    private LocalDateTime startDate;
    @JsonFormat(shape=JsonFormat.Shape.STRING,pattern="yy년 MM월 dd일 HH:mm",timezone = "Asia/Seoul")
    private LocalDateTime endDate;

    private String tag1;

    private String tag2;

    private String tag3;

    private String poster;

    @JsonProperty("like_count")
    private int likeCount=0;

    private String author;

    private int step;

}
