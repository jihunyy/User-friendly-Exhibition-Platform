package com.example.backend.model.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Entity
public class Recommended {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long offlineid;

    private Long onlineid;

    private String title;

    private String link;

    private int start_date;

    private int end_date;

    private String locate;

    private String place;

    private String poster;

    private String keywords;

    private String descript;

}
