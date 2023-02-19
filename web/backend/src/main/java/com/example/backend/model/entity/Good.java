package com.example.backend.model.entity;


import lombok.*;

import javax.persistence.*;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Entity
public class Good {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private boolean test;
    @ManyToOne(fetch=FetchType.LAZY)
    @JoinColumn(name="online_exhibition_id")
    @ToString.Exclude
    private OnlineExhibition onlineExhibition;

    @ManyToOne(fetch=FetchType.LAZY)
    @JoinColumn(name="user_id")
    @ToString.Exclude
    private User user;


}
