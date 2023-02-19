package com.example.backend.model.dto;


import com.example.backend.model.entity.OnlineExhibition;
import lombok.*;

@Data
@ToString
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class MainPageExhibitionListDto {
    private String username;
    private OnlineExhibition onlineExhibition;
}
