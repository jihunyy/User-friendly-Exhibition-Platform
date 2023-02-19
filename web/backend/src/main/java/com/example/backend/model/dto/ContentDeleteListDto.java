package com.example.backend.model.dto;


import lombok.Builder;
import lombok.Data;
import lombok.ToString;

import java.util.List;


@Data
@ToString
@Builder
public class ContentDeleteListDto {

    private List<Integer> deleteList;
    private Long onlineExhibitionId;


}
