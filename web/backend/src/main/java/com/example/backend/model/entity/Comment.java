package com.example.backend.model.entity;


import lombok.*;

import javax.persistence.*;
import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Entity
public class Comment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String description;

    @ManyToOne(fetch=FetchType.LAZY)
    @JoinColumn(name="online_exhibition_id")
    @ToString.Exclude
    private OnlineExhibition onlineExhibition;

    @ManyToOne(fetch=FetchType.LAZY)
    @JoinColumn(name="user_id")
    @ToString.Exclude
    private User user;
}
