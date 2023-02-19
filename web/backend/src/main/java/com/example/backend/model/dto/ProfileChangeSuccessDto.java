package com.example.backend.model.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.ToString;

@Data
@ToString
@AllArgsConstructor
public class ProfileChangeSuccessDto {
    boolean success;
    String url;
}
