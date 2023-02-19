package com.example.backend.model.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.ToString;

@Data
@ToString
@AllArgsConstructor
@Builder
public class RecommendRequestDto {
    private Long onlineid;
    private String tag1;
    private String tag2;
    private String tag3;
}
