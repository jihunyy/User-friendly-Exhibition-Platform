package com.example.backend.model.entity;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.BatchSize;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import javax.annotation.*;




@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Entity


public class OfflineExhibition {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;

    private String link;

    private int start_date;

    private int end_date;

    private String locate;

    private String place;

    private String poster;


    @Column(length = 2000)
    private String descript;

    private String keyword;


    private String word2vec;


}
