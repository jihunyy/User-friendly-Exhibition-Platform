package com.example.backend.model.dto;

import com.example.backend.model.entity.User;
import lombok.AllArgsConstructor;
import lombok.Data;

@AllArgsConstructor
@Data
public class LoginFailDto {
    boolean success;
    String message;
    User user;
}
