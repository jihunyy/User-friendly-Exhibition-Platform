package com.example.backend.model.dto;


import lombok.Data;
import lombok.ToString;


@Data
@ToString
public class EmailConfirmDto {
    private Long userId;
    private String email;

}
