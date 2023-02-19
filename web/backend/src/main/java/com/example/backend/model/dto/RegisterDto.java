package com.example.backend.model.dto;



import lombok.Data;
import lombok.ToString;


@Data
@ToString
public class RegisterDto {
    private String username;
    private String nickname;
    private String password1;
    private String password2;
}
