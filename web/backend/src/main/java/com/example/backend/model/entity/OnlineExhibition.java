package com.example.backend.model.entity;


import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.*;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Entity
public class OnlineExhibition {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;

    private String description;

    private LocalDateTime startDate;

    private LocalDateTime endDate;

    private String tag1;

    private String tag2;

    private String tag3;

    private String bgm;

    private String theme;

    private String poster;

    @JsonProperty("like_count")
    private int likeCount=0;

    @ManyToOne(fetch=FetchType.LAZY)
    @JoinColumn(name="user_id")
    @ToString.Exclude
    @JsonIgnore
    private User user;

    @JsonIgnore
    @OneToMany(mappedBy = "onlineExhibition",fetch=FetchType.LAZY,cascade = {CascadeType.ALL})
    private List<Comment> comments = new ArrayList<>();

    @JsonIgnore
    @OneToMany(mappedBy = "onlineExhibition",fetch=FetchType.LAZY,cascade = {CascadeType.ALL})
    private List<Good> likes = new ArrayList<>();


    @OneToMany(mappedBy = "onlineExhibition",fetch=FetchType.LAZY,cascade = {CascadeType.ALL})
    private List<Content> contents = new ArrayList<>();

    private int step;

    private boolean isOnline;
}
