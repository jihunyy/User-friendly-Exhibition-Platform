package com.example.backend.model.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.ToString;

@Data
@ToString
@AllArgsConstructor
public class HeartClickDto {
    private Long id;
    private boolean clicked;
    private int likeCount;

    public Long getId(){
        return id;
    }

    public boolean getClicked(){
        return clicked;
    }

    public int getLikeCount(){return likeCount;}
}
