package com.example.backend.model.dto;


import lombok.Data;
import lombok.ToString;


@Data
@ToString
public class LoginDto {
    private String username;
    private String password;
    private String refreshToken;
}
