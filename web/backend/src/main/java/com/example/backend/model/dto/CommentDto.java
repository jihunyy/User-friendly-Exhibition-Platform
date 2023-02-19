package com.example.backend.model.dto;


import lombok.Builder;
import lombok.Data;
import lombok.ToString;


@Data
@ToString
@Builder
public class CommentDto {
    private Long id;
    private String username;
    private String nickname;
    private String description;
    private String profile;
}
