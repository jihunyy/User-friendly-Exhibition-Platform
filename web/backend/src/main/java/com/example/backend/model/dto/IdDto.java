package com.example.backend.model.dto;


import lombok.Builder;
import lombok.Data;
import lombok.ToString;


@Data
@ToString
@Builder
public class IdDto {
    private Long id;
    private boolean success;
}
