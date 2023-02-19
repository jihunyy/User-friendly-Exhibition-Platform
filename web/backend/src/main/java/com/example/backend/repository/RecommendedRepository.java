package com.example.backend.repository;

import com.example.backend.model.entity.Comment;
import com.example.backend.model.entity.OnlineExhibition;
import com.example.backend.model.entity.Recommended;
import com.example.backend.model.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;


public interface RecommendedRepository extends JpaRepository<Recommended,Long> {

    public Recommended findRecommendedByOnlineid(Long id);


}
