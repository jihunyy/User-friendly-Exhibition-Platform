package com.example.backend.model.dto;


import lombok.Builder;
import lombok.Data;
import lombok.ToString;


@Data
@ToString
@Builder
public class BgmDto {

    private int step;
    private String src;

}
