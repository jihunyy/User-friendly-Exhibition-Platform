package com.example.backend.model.dto;


import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Builder;
import lombok.Data;
import lombok.ToString;


@Data
@ToString
@Builder
public class CommentReqDto {
    @JsonProperty(value = "online_exhibition_id")
    private Long OnlineExhibitionId;
    private String description;

}
