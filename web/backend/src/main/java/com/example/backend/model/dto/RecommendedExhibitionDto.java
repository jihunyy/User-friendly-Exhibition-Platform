package com.example.backend.model.dto;

import lombok.*;

@Data
@ToString
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class RecommendedExhibitionDto {
    private String descript;
    private int end_date;
    private Long id;
    private String keyword;
    private String link;
    private String locate;
    private String place;
    private String poster;
    private int start_date;
    private String title;
    private float word2vec;
    private Long offlineid;
}
